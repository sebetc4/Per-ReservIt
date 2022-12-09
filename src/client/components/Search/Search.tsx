import { Box, FormControl, IconButton, InputLabel, NativeSelect, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { SyntheticEvent, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { KeysOfPropertyType, PropertyType } from '../../../types/properties.types';
import { propertyType } from '../../../utils/constants.utils';

interface ISearchProps {}

const keysOfPropertyType = Object.keys(propertyType) as KeysOfPropertyType[];

export default function Search({}: ISearchProps) {
    // Hooks
    const router = useRouter();
    const locationRef = useRef<HTMLInputElement>(null);
    const guestsRef = useRef<HTMLInputElement>(null);
    const typeRef = useRef<HTMLInputElement>(null);

    // State
    const initialLocation = typeof router.query.location === 'string' ? router.query.location : '';
    const initialGuests = typeof router.query.guests === 'string' ? router.query.guests : '2';
    const initialType = typeof router.query.type === 'string' ? (router.query.type as PropertyType['type']) : 'all';

    // Handlers
    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        const query = locationRef.current?.value.trim()
            ? `/?location=${locationRef.current?.value.trim()}&guests=${guestsRef.current?.value}&type=${
                  typeRef.current?.value
              }`
            : '/';
        router.replace(query);
    };

    return (
        <>
            <Typography
                component='h2'
                variant='h5'
            >
                Rechercher votre hébergement
            </Typography>
            <Box
                component='form'
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    pt: 2,
                    pb: 4,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        gap: 3,
                    }}
                >
                    <FormControl>
                        <InputLabel
                            variant='standard'
                            htmlFor='type-input'
                        >
                            Type d'hébergement
                        </InputLabel>
                        <NativeSelect
                            inputRef={typeRef}
                            defaultValue={initialType}
                            inputProps={{
                                name: 'type',
                                id: 'type-input',
                            }}
                        >
                            {keysOfPropertyType.map((type) => (
                                <option key={`${type}-item`} value={type}>{propertyType[type]}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                    <Box position='relative'>
                        <TextField
                            defaultValue={initialLocation}
                            inputRef={locationRef}
                            name='location'
                            id='location-input'
                            label='Destination'
                            variant='standard'
                            helperText={`Nom d'établissement, adresse, ville, code postal`}
                        />
                    </Box>
                    <FormControl>
                        <InputLabel
                            variant='standard'
                            htmlFor='guests-input'
                        >
                            Voyageurs
                        </InputLabel>
                        <NativeSelect
                            defaultValue={initialGuests}
                            inputRef={guestsRef}
                            inputProps={{
                                name: 'guests',
                                id: 'guests-input',
                            }}
                        >
                            {['1', '2', '3', '4', '5', '6 et +'].map((value, i) => (
                                <option key={`${value}-item`} value={(i + 1).toString()}>{value}</option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                </Box>
                <IconButton
                    type='submit'
                    size='large'
                    color='primary'
                >
                    <SearchIcon sx={{ fontSize: 'inherit' }} />
                </IconButton>
            </Box>
        </>
    );
}
