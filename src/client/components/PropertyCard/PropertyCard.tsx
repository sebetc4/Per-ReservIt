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
    const { type, name, description, location, rating, images, _id } = property;
    return (
        <Link
            href={`/property/${_id}`}
            style={{ textDecoration: 'none', width: '100%', maxWidth: '300px' }}
        >
            <Box
                component='article'
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    boxShadow:
                        '0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03)',
                    borderRadius: 3,
                    cursor: 'pointer',
                    color: 'text.primary',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                        transform: 'scale(1.03)',
                        boxShadow:
                            '0 13px 40px -5px hsla(240, 30.1%, 28%, 0.12), 0 8px 32px -8px hsla(0, 0%, 0%, 0.14), 0 -6px 32px -6px hsla(0, 0%, 0%, 0.02)',
                    },
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '200px',
                        position: 'relative',
                    }}
                >
                    <Image
                        alt={name}
                        fill
                        src={images[0].url}
                        style={{
                            objectFit: 'cover',
                        }}
                    />
                </Box>
                <Box sx={{
                    padding: 2,
                    width: '100%',
                }}>
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
                        {`${propertyType[type]} à ${location.city}`}
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
                        sx={{mt: 1}}
                    />
                </Box>
            </Box>
        </Link>
    );
}
