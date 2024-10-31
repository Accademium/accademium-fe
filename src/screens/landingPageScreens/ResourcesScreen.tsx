

interface CardData {
    title: string;
    description: string;
    link: string;
    linkUrl: string;
}

interface ResourcesScreenProps {
    title: string;
    description: string;
    link: string;
    linkUrl: string;
}

const cardsData: CardData[] = [
    {
      title: "What is the application" +
          " process?",
      description: "Explore the essential steps" +
          " of applying to universities" +
          " abroad, from research to" +
          " admissions, ensuring you're" +
          " ready for your academic" +
          " journey.",
      link: "Read the article ⟶",
      linkUrl: "#",
    },
    {
      title: "Managing Finances While" +
          " Studying Abroad?",
      description: "Discover effective strategies" +
          " for budgeting and maximizing" +
          " financial resources during" +
          " your study abroad" +
          " experience.",
      link: "Watch the video ⟶",
      linkUrl: "#",
    },
    {
      title: "How to find accommodation" +
          " while you are abroad",
      description: "Navigate finding accommodation" +
          " abroad confidently with practical" +
          " advice on researching housing," +
          " securing leases, and settling in," +
          " making yourself feel at home.",
      link: "Read the guide ⟶",
      linkUrl: "#",
    },
]

const Card: React.FC<ResourcesScreenProps> = ({title, description, link, linkUrl}) => {
    return (
        <div className="flex flex-col items-center mx-auto pt-8 bg-[#C0D6FBFF] rounded-3xl pb-20 px-12 w-[350px] h-[430px]">
            <h3 className="font-extrabold text-lg text-center">{title}</h3>
            <p className="mt-12 font-bold text-center h-1/2">{description}</p>
            <a href={linkUrl}
               className="mt-8 bg-[#4c9cfc] font-bold text-white rounded-3xl py-2 px-12"
            >{link}</a>
        </div>
    )
}

const Resources = () => {
    return(
        <div id="resources" className="pt-16 pb-2 w-10/12 mx-auto">
            <h2 className="text-center lg:text-4xl max-lg:text-2xl font-extrabold">
                Resources to help you kickstart your academic journey
            </h2>
            <div className="max-lg:space-y-8 lg:flex gap-20 mt-12 border-b border-black pb-20">
                {cardsData.map((card, index) => (
                    <Card
                        key={index}
                        title={card.title}
                        description={card.description}
                        link={card.link}
                        linkUrl={card.linkUrl}
                    />
                ))}
            </div>
        </div>
    );

}

export default Resources;