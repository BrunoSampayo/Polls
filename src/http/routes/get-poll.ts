import { FastifyInstance } from "fastify";
import z from "zod";
import { prismaClient } from "../../lib/prisma";


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
        return reply.send({ poll });
    })


}