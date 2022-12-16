import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';

type CustomAvatarProps = {
    username: string;
    avatarUrl: string | null;
};

const stringToColor = (string: string) => {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
};

const getInitials = (name: string) => {
    const words = name.split(' ');
    const initials = words.length > 1 ? words[0][0] + words[1][0] : words[0][0];
    return initials.toUpperCase();
};

export default function CustomAvatar({ username, avatarUrl }: CustomAvatarProps) {
    const [initials, setInitials] = useState<string>('');
    const [color, setColor] = useState<string>('');

    useEffect(() => {
        setInitials(getInitials(username));
        setColor(stringToColor(username));
    }, [username]);

    return avatarUrl ? (
        <Avatar
            alt={`Avatar de ${username}`}
            src={avatarUrl}
        />
    ) : (
        <Avatar sx={{ bgcolor: color }}>{initials}</Avatar>
    );
}
