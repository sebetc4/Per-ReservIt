import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination } from 'swiper';
import { Box } from '@mui/material';
import { IImageProperty, IPropertySchema } from '../../../../types/properties.types';
import 'swiper/css';
import 'swiper/css/pagination';

interface ICarouselProps {
    name: IPropertySchema['name'];
    images: IImageProperty[];
}

SwiperCore.use([Pagination]);

export default function Carousel({ name, images }: ICarouselProps) {
    return (
        <Box
            sx={{
                width: '100%',
                maxWidth: '600px',
                height: '400px',
            }}
        >
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                speed={500}
                loop={true}
                touchRatio={1.5}
                navigation={true}
                pagination={{ clickable: true }}
                className='mySwiper'
                style={{ width: '100%', height: '100%' }}
            >
                {images.map((image) => (
                    <SwiperSlide style={{ width: '100%', height: '100%' }}>
                        <Image
                            src={image.url}
                            alt={name}
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Box>
    );
}
