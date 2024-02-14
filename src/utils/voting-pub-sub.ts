
type Message = { pollOptionId: string, votes: number }
type Subscriber = (message: Message) => void;

class VotingPubSub {
    private channels: Record<string, Subscriber[]> = {};


    subscribe( pollId: string, subcriber: Subscriber) {
        if(!this.channels[pollId]){
            this.channels[pollId] = []
        }
        this.channels[pollId].push(subcriber)
    }

    publish(pollId:string, message:Message){
        if(!this.channels[pollId]){
            return;
        }

        for(const subcribet of this.channels[pollId]){
            subcribet(message)
        }
    }
}

export const voting = new VotingPubSub();