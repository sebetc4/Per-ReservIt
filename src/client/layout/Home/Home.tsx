import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';
import { setAlert } from '../../../store/slices/alert.slice';
import { PropertyItem } from '../../components';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.hooks';
import { propertiesPerPage } from '../../../utils/constants.utils';
import { useRouter } from 'next/router';

export default function Home() {
    // Hooks
    const dispatch = useAppDispatch();
    const router = useRouter();

    // Store
    const { error, data: properties, propertiesCount } = useAppSelector((state) => state.properties);

    const currentPage = (typeof router.query.page === 'string' && +router.query.page) || 1;

    useEffect(() => {
        error &&
            dispatch(
                setAlert({
                    type: 'error',
                    message: "Erreur lors de la récupération des hébergements. Merci d'essayer ultérieurement.",
                })
            );
    }, []);

    const handleChangeCurrentPage = (e: ChangeEvent<unknown>, value: number) => router.replace(`/?page=${value}`);

    return (
        <Container
            component='main'
            maxWidth='xl'
            sx={{
                pt: 6,
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                    component='h2'
                    variant='h2'
                >
                    Trouvez votre hébergement à Biarritz
                </Typography>
                <Typography
                    variant='h4'
                    sx={{
                        ml: 2,
                    }}
                >
                    ({propertiesCount} résultat{propertiesCount > 1 && 's'})
                </Typography>
            </Box>
            <Grid
                container
                rowSpacing={5}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                sx={{ mt: 1 }}
            >
                {properties.map((property) => (
                    <Grid
                        key={property._id}
                        item
                        xs={3}
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        <PropertyItem property={property} />
                    </Grid>
                ))}
            </Grid>
            {propertiesPerPage < propertiesCount && (
                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        count={Math.ceil(propertiesCount / propertiesPerPage)}
                        page={currentPage}
                        onChange={handleChangeCurrentPage}
                        color='secondary'
                    />
                </Box>
            )}
        </Container>
    );
}
