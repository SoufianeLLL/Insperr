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
                                        Only one keyword allowed at a time.
                                    </li>
                                    <li className="w-full">
                                        To generate the quote you must select a category.
                                    </li>
                                    <li className="w-full">
                                        AutoPost would post your quote to your Twitter account if you turned AutoPost ON within the first 5 minutes of creating the quote.
                                    </li>
                                    <li className="w-full">
                                        You can't edit a quote after posting it on Twitter.
                                    </li>
                                    <li className="w-full">
                                        You can't retweet the untweeted quote unless the owner tweets the quote first.
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