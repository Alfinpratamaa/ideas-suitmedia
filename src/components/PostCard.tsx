import Image from 'next/image';

const PostCard: React.FC<any> = ({ post }) => {
    const { title, medium_image, published_at } = post;

    const placeholderSrc = '/image/placeholder.png';

    const src = medium_image[0].url ? medium_image[0].url : placeholderSrc;

    return (
        <div className="border py-4 px-8 rounded shadow-lg">
            <div className="relative w-full h-0" style={{ paddingBottom: '75%' }}>
                <Image
                    src={placeholderSrc}
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
            <h2 className=" text-lg font-bold line-clamp-3">{title}</h2>
        </div>
    );
};

export default PostCard;
