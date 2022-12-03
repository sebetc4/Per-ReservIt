import { Box, Container, Rating, Typography } from '@mui/material';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { EffectFlip, Navigation, Pagination } from 'swiper';
import { useAppSelector } from '../../hooks/redux.hooks';
import StarIcon from '@mui/icons-material/Star';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/pagination';
import { PropertyType } from '../../../types/properties.types';

SwiperCore.use([Pagination]);

interface IProperty {}

export default function Property({}: IProperty) {
    const { error, data: property } = useAppSelector((state) => state.property);

    const {
        name,
        type,
        description,
        address,
        city,
        postcode,
        accommodation,
        internet,
        breakfast,
        petsAllowed,
        roomCleaning,
        rating,
        numbOfReview,
        reviews,
        images,
        user,
    } = property as PropertyType;



    return property ? (
        <Container
            component='main'
            maxWidth='xl'
        >
            <Typography
                component='h1'
                variant='h2'
            >
                {property.name}
            </Typography>
            <Typography>{`${property.address}, ${property.city}, ${property.postcode}`}</Typography>
            <Box sx={{ display: 'flex' }}>
                <Rating
                    name={`rating-${property.name}`}
                    value={property.rating}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                        <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize='inherit'
                        />
                    }
                />
                <Typography
                    sx={{
                        ml: 1,
                    }}
                >
                    ({property.numbOfReview} avis)
                </Typography>
            </Box>
            <Box>
                <Typography>{property.description}</Typography>
            </Box>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                speed={500}
                loop={true}
                touchRatio={1.5}
                navigation={true}
                pagination={{ clickable: true }}
                className='mySwiper'
                style={{
                    maxWidth: '600px',
                }}
            >
                {property.images.map((image) => (
                    <SwiperSlide style={{}}>
                        <Image
                            src={image.url}
                            alt={name}
                            width={600}
                            height={400}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </Container>
    ) : 
    <>Loading</>;
}
