"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
import { Autoplay, Pagination, EffectCreative } from "swiper";
import { BannerItemType } from "@/types/banner.type";
import BannerItem from "./BannerItem";
import { blogData } from "@/data/blogData";
import { useSession } from "next-auth/react";

type Props = {};

const Banner = (props: Props) => {
    const { data: session } = useSession();
    return (
        <div className="w-full h-full relative ">
            <Swiper
                grabCursor={true}
                slidesPerView="auto"
                spaceBetween={30}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                effect={"creative"}
                creativeEffect={{
                    prev: {
                        shadow: true,
                        translate: [0, 0, -400],
                    },
                    next: {
                        translate: ["100%", 0, 0],
                    },
                }}
                modules={[Autoplay, Pagination, EffectCreative]}
            >
                {[blogData[3], blogData[2], blogData[4]].map((item) => {
                    return (
                        <SwiperSlide key={item.id}>
                            <BannerItem {...item}></BannerItem>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
};

export default Banner;
