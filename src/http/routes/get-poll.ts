import { FastifyInstance } from "fastify";
import z from "zod";
import { prismaClient } from "../../lib/prisma";
import { redis } from "../../lib/redis";


export async function getPoll(app: FastifyInstance) {
    app.get('/polls/:pollId', async (request, reply) => {
        const getPollParams = z.object({
            pollId: z.string().uuid(),

        })

        const { pollId } = getPollParams.parse(request.params);

        const poll = await prismaClient.poll.findUnique({
            where: {
                id: pollId
            },
            include: {
                options: {
                    select: {
                        id: true,
                        title: true
                    }
                }
            }
        })

        if(!poll){
            return reply.status(404).send({message: "Poll not found"})
        }

        const result = await redis.zrange(pollId, 0, -1, 'WITHSCORES')

        const votes:Record<string,number> ={}
        for (let i=0; i< result.length; i+=2){
            const optionID = result[i];
            const score = Number(result[i+1]);
            votes[optionID] =score;
        }
        console.log(votes)

        return reply.send({ 
            poll:{
                id: poll.id,
                title: poll.title,
                options: poll.options.map(option => ({
                    id: option.id,
                    title: option.title,
                    score: (option.id in votes) ? votes[option.id] : 0
                }))
            }
         });
    })


}