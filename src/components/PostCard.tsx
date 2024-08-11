import Image from 'next/image';

const PostCard: React.FC<any> = ({ post }) => {
    const { title, medium_image, published_at } = post;

    const randomImageSrc = `https://picsum.photos/seed/${Math.random()}/800/600`;

    // tidak bisa dipake karna url image forbbiden
    const srcImage = medium_image[0]?.url || randomImageSrc;

    return (
        <div className="border py-4 px-8 rounded shadow-lg">
            <div className="relative w-full h-0" style={{ paddingBottom: '75%' }}>
                <Image
                    src={randomImageSrc}
                    alt={title}
                    fill
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                />
            </div>
            <p className="text-sm mt-4 text-gray-600 font-semibold">
                {new Date(published_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                })}
            </p>
            <h2 className="text-lg font-bold line-clamp-3">{title}</h2>
        </div>
    );
};

export default PostCard;
