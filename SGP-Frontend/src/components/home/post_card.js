import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
import { Image } from 'antd';

export default function Post({ userName, title, description, imageUrl,id }) {
    const handleopen = ()=> {
        <Image src={imageUrl} />
    }
    return (
        <Card variant="outlined" sx={{ width: 420 }}>
            <CardOverflow>
                <AspectRatio ratio="2">
                    <img
                        src={imageUrl}
                        srcSet="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?auto=format&fit=crop&w=318&dpr=2 2x"
                        loading="lazy"
                        alt=""
                        onClick={handleopen}
                        className='image-fix'
                    />
                </AspectRatio>
                {/* <IconButton
                    aria-label="Like minimal photography"
                    size="md"
                    variant="solid"
                    color="danger"
                    sx={{
                        position: 'absolute',
                        zIndex: 2,
                        borderRadius: '50%',
                        right: '1rem',
                        bottom: 0,
                        transform: 'translateY(50%)',
                    }}
                >
                    <Favorite />
                </IconButton> */}
            </CardOverflow>
            <CardContent>
                <Typography level="title-md">
                    <Link href="#multiple-actions" overlay underline="none">
                        {title}
                    </Link>
                </Typography>
                <Typography level="title-md">
                    <Link href="#multiple-actions" overlay underline="none">
                        {description}
                    </Link>
                </Typography>
                <Typography level="body-sm">
                    <Link href="#multiple-actions">{userName}</Link>
                </Typography>
            </CardContent>
            {/* <CardOverflow variant="soft">
                <Divider inset="context" />
                <CardContent orientation="horizontal">
                    <Typography level="body-xs">6.3k Likes</Typography>
                    <Divider orientation="vertical" />
                    <Typography level="body-xs">1 hour ago</Typography>
                </CardContent>
            </CardOverflow> */}
        </Card>
    );
}