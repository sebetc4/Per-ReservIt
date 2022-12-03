import Typography from '@mui/material/Typography';
import { PropertyPreview } from '../../../types/properties.types';
import Image from 'next/image';
import { Box, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { propertyType } from '../../../utils/constants.utils';
import Link from 'next/link';

interface IPropertyCardProps {
    property: PropertyPreview;
}

export default function PropertyItem({ property }: IPropertyCardProps) {
    const { type, name, description, city, rating, images, _id } = property;
    return (
        <Link
            href={`/property/${_id}`}
            style={{ textDecoration: 'none'  }}
        >
            <Box
                component='article'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '300px',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                    padding: 1,
                    borderRadius: 2,
                    cursor: 'pointer',
                    color: 'text.primary'
                }}
            >
                <Image
                    alt={name}
                    width={200}
                    height={200}
                    src={images[0].url}
                />
                <Box>
                    <Typography
                        gutterBottom
                        variant='h5'
                        component='h3'
                    >
                        {name}
                    </Typography>
                    <Typography
                        gutterBottom
                        variant='subtitle1'
                    >
                        {`${propertyType[type]} à ${city}`}
                    </Typography>
                    <Typography
                        variant='body2'
                        color='text.secondary'
                    >
                        {description}
                    </Typography>
                    <Rating
                        name={`rating-${name}`}
                        value={rating}
                        readOnly
                        precision={0.5}
                        emptyIcon={
                            <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize='inherit'
                            />
                        }
                    />
                </Box>
            </Box>
        </Link>
    );
}
