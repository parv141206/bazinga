import Image from 'next/image';
import React from 'react';
import { motion } from "framer-motion"
import Button from '../Statefull/Button';
export default function HeroSection() {
    return (
        <div className="bg-main">

            <div className=' h-screen  flex p-10 container mx-auto'>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="items-center w-full flex justify-end flex-col gap-3">
                    <div className="text-7xl font-bold text-white">AgroExpert</div>
                    <div className="text-3xl text-white">Cultivating Success, <br /> One Seed at a Time!</div>
                    <Button title="Get Started" onClick={() => { console.log("clicked") }} />
                </motion.div>

            </div>
        </div>
    );
}
{/* <div className="w-1/2">
                <div className="flex items-center justify-center space-x-4">
                    <div className="flex flex-col justify-center space-y-4">
                        <div className="h-20"></div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative aspect-[3/2] w-full">
                            <Image className='object-cover rounded-3xl' src={'/crop-5.jpg'} alt="Crop 1" width={300} height={300} />
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}  className="relative aspect-[3/2] w-full">
                            <Image className='object-cover rounded-3xl' src={'/crop-6.jpg'} alt="Crop 2" width={300} height={300} />
                        </motion.div>
                    </div>
                    <div className="flex flex-col space-y-4 justify-center">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}  className="relative aspect-[3/2] w-full">
                            <Image className='object-cover rounded-3xl' src={'/crop-3.jpg'} alt="Crop 3" width={300} height={300} />
                        </motion.div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}  className="relative aspect-[3/2] w-full">
                            <Image className='object-cover rounded-3xl' src={'/crop-4.jpg'} alt="Crop 4" width={300} height={300} />
                        </motion.div>
                        <div className="h-20"></div>
                    </div>
                </div>
            </div> */}
