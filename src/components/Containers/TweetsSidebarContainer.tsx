import { Accordion } from "flowbite-react"


const TweetsSidebarContainer = ({ children=null }) => {

    return <>
        <div className="w-80 h-screen overflow-hidden flex-none hidden lg:block p-4 md:p-6 border-l border-slate-200 dark:border-zinc-800">
            <div className="accordion text-base w-full">
                <Accordion flush={true}>
                    <Accordion.Panel>
                        <Accordion.Title>Rules</Accordion.Title>
                        <Accordion.Content>
                            <div className="w-full">
                                <ul className="list-disc list-inside space-y-2 text-slate-500 dark:text-zinc-400">
                                    <li className="w-full">
                                        AutoPost will post your quote to your Twitter's account, if you turned AutoPost ON within the first 5 min from creating the quote.
                                    </li>
                                    <li className="w-full">
                                        You can't edit quote after post it on Twitter.
                                    </li>
                                    <li className="w-full">
                                        You can't retweet untweeted quote, unless the owner tweet the quote first.
                                    </li>
                                </ul>
                            </div>
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title>What's comming</Accordion.Title>
                        <Accordion.Content>
                            <div className="w-full">
                                <ul className="list-disc list-inside space-y-2 text-slate-500 dark:text-zinc-400">
                                    <li><u>Quotes Thread</u>: Generate Tweetstorm by one click with custom keyword.</li>
                                    <li><u>Quotes Polls</u>: Generate custom questions to your audience.</li>
                                    <li><u>Quotes Schedule</u>: Schedule your tweets to be added on Twitter later.</li>
                                    <li><u>Edit tweeted Quotes</u>: Ability to edit your quotes/tweets posted on Twitter (within the first 30 min from posting it).</li>
                                </ul>
                            </div>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </div>
        </div>
    </>
}

export default TweetsSidebarContainer