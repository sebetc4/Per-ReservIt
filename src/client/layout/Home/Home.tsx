import { Container, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { setAlert } from '../../../store/slices/alert.slice';
import { PropertyItem } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';

export default function Home() {
    // Hooks
    const dispatch = useAppDispatch();

    // Store
    const { error, data: properties, propertiesCount } = useAppSelector((state) => state.properties);

    useEffect(() => {
        error &&
            dispatch(
                setAlert({
                    type: 'error',
                    message: 'Erreur lors de la récupération des hébergements. Merci de ressayer plus tard.',
                })
            );
    }, []);

    return (
        <Container
            component='main'
            maxWidth='xl'
        >
            <Typography
                component='h2'
                variant='h2'
            >
                Trouvez votre hébergement à Biarritz ({propertiesCount} résultats)
            </Typography>
            <Grid
                container
                rowSpacing={3}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
                {properties.map((property) => (
                    <Grid
                        key={property._id}
                        item
                        xs={3}
                    >
                        <PropertyItem property={property} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
