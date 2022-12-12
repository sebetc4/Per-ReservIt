import { Box, Grid, Pagination, Typography } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';
import { setAlert } from '../../../../store/slices/alert.slice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.hooks';
import { propertiesPerPage } from '../../../../utils/constants.utils';
import { useRouter } from 'next/router';
import { PropertyCard } from './components';

export default function Home() {
    // Hooks
    const dispatch = useAppDispatch();
    const router = useRouter();

    // Store
    const { error, data: properties, propertiesCount } = useAppSelector((state) => state.properties);

    // Constants
    const currentPage = (typeof router.query.page === 'string' && +router.query.page) || 1;
    const location = (typeof router.query.location === 'string' && router.query.location) || null;

    useEffect(() => {
        error &&
            dispatch(
                setAlert({
                    type: 'error',
                    message: "Erreur lors de la récupération des hébergements. Merci d'essayer ultérieurement.",
                })
            );
    }, [dispatch, error]);

    // Handlers
    const handleChangeCurrentPage = (e: ChangeEvent<unknown>, value: number) => {
        let query = new URLSearchParams(window.location.search)
        if (query.has('page')) {
            query.set('page', value.toString())
        } else {
            query.append('page', value.toString())
        }
        router.replace({search: query.toString()})
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                    component='h1'
                    variant='h3'
                >
                    {location ? `${location}:` : "Découvrez notre choix d'hébergement"}
                </Typography>
                {location && (
                    <Typography
                        variant='h4'
                        sx={{
                            ml: 2,
                        }}
                    >
                        ({propertiesCount} résultat{propertiesCount > 1 && 's'})
                    </Typography>
                )}
            </Box>
            {propertiesCount > 0 ? (
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
                            lg={3}
                            md={4}
                            sm={6}
                            xs={12}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <PropertyCard property={property} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography>Nous n'avons trouvé aucun résultat pour cette recherche</Typography>
            )}

            {propertiesPerPage < propertiesCount && (
                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
                    <Pagination
                        count={Math.ceil(propertiesCount / propertiesPerPage)}
                        page={currentPage}
                        onChange={handleChangeCurrentPage}
                        color='primary'
                    />
                </Box>
            )}
        </Box>
    );
}
