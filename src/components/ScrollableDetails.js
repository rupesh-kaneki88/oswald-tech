'use client'
import { motion } from 'framer-motion';

const ScrollableDetails = () => {
    // cards
    const cards = [
        {
        //   type: 'RESEARCH REPORT',
        //   icon: <FileText className="w-6 h-6" />,
          title: 'Complete IT Solutions',
          description: 'We offer customized IT solutions for small to mid-sized businesses, leveraging our expertise in operating systems, network security, cloud services, software development, and databases to provide top-tier technology support.',
          action: 'Try service',
          bgImage: './IT-service1.jpg'
        },
        {
        //   type: 'VIDEO',
        //   icon: <Play className="w-6 h-6" />,
          title: 'Optimize IT Budgets',
          description: 'Is your IT budget mainly spent on maintenance? Many businesses struggle with upkeep costs, leaving little for new technology. Outsourcing your IT management to us can cut costs and help you focus on business growth.',
          action: 'Try service',
          bgImage: './IT-service2.jpg'
        },
        {
        //   type: 'RESEARCH REPORT',
        //   icon: <FileText className="w-6 h-6" />,
          title: `Strategic IT Planning`,
          description: 'Technology is always changing, and we’re here to keep you ahead. We’ll help with strategic IT planning to ensure your infrastructure supports your business’s growth and future tech needs.',
          action: 'Try service',
          bgImage: './IT-service3.jpg'
        },
        
      ];

    return(
        <section className="w-full min-h-screen bg-white py-16 px-8 lg:px-20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 lg:gap-22 md:gap-14 lg:mx-20 md:mx-10 sm:mx-5 ">
                {/* fixed column */}
                <div className="justify-center items-center flex flex-col text-wrap sticky top-0 max-h-screen lg:p-4">
                    <h2 className="lg:text-6xl text-3xl text-gray-900 mb-2 font-nunito font-light">
                        Leveraging technology to address real-world challenges.
                    </h2>
                    <p className="font-light text-gray-900 font-nunito text-lg md:text-2xl my-8">
                        We specialize in delivering innovative IT solutions that drive business growth and ensure security. 
                        Our services are designed to streamline operations, strengthen security, and simplify technology management. 
                        We provide customized solutions that equip your business with the right technology to achieve success.
                    </p>
                </div>
                {/* scrollable column */}
                <div className="justify-center items-center flex flex-col lg:p-4">
                    {cards.map((card, index) => (
                        <motion.div
                        key={index}
                        className="group relative lg:h-[360px] lg:w-[620px] md:w-[220px] md:h-[120px] sm:h-[80px] sm:w-[120px] my-4 overflow-hidden  cursor-pointer"
                        whileHover="hover"
                        initial="initial"
                        variants={{
                            initial: { scale: 1 }
                        }}
                        >
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                            style={{ 
                            backgroundImage: `url(${card.bgImage})`,
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            backgroundBlend: 'overlay'
                            }}
                        />
                        
                        {/* Content Overlay */}
                        <div className="absolute inset-0 bg-black/40 transition-opacity duration-300 group-hover:bg-black/50" />
                        
                        {/* Content */}
                        <div className="relative h-full p-8 flex flex-col justify-between text-white z-10">
                            {/* Top Content */}
                            <div className="relative inline-block">
                            <div className="flex items-center gap-2 mb-4">
                                {card.icon}
                                <span className="text-sm font-medium">{card.type}</span>
                            </div>
                            <h3 className="text-2xl font-normal font-nunito mb-4 leading-tight">
                                {card.title}
                            </h3>
                            <div className="absolute  left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-400 ease-out group-hover:w-full" />
                            <div className="overflow-hidden">
                                <p 
                                    className="text-md lg:text-lg text-gray-200 font-nunito transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out mt-24"
                                >
                                    {card.description}
                                </p>
                            </div>
                            </div>
                            
                            {/* Action Link */}
                            {/* <motion.div
                            className="inline-flex items-center gap-2"
                            variants={{
                                hover: { x: 10 },
                                initial: { x: 0 }
                            }}
                            >
                            <span className="text-sm font-medium">{card.action}</span>
                            <motion.span variants={{
                                hover: { x: 5 },
                                initial: { x: 0 }
                            }}>
                                →
                            </motion.span>
                            </motion.div> */}
                        </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ScrollableDetails