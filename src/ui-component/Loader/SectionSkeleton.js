import { Box, Skeleton } from '@mui/material';

export default function SectionSkeleton({
    lines = 3,
    variant = 'text',
    width = '100%',
    height,
    spacing = 1,
    borderRadius = 2,

}) {
    return (
        <Box>
            {[...Array(lines)].map((_, i) => (
                <Skeleton
                    key={i}
                    variant={variant}
                    width={width}
                    height={height}
                    sx={{ mb: spacing, borderRadius }}
                />
            ))}
        </Box>
    );
}
