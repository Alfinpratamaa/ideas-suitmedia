'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './PostCard';

interface Image {
    id: number;
    file_name: string;
    mime: string;
    url: string;
}

interface Post {
    id: string;
    title: string;
    small_image: Image[];
    medium_image: Image[];
    published_at: string;
}

const PostList: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [sort, setSort] = useState<'published_at' | '-published_at'>('-published_at');
    const [pageSize, setPageSize] = useState<number>(10);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [postNumber, setPostNumber] = useState<any>(1);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const sortParam = urlParams.get('sort');
        const pageSizeParam = urlParams.get('pageSize');
        const pageNumberParam = urlParams.get('pageNumber');

        if (sortParam) setSort(sortParam as typeof sort);
        if (pageSizeParam) setPageSize(parseInt(pageSizeParam));
        if (pageNumberParam) setPageNumber(parseInt(pageNumberParam));
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams();
        urlParams.set('sort', sort);
        urlParams.set('pageSize', pageSize.toString());
        urlParams.set('pageNumber', pageNumber.toString());
        history.replaceState(null, '', `?${urlParams.toString()}`);

        const fetchPosts = async () => {
            try {
                const response = await axios.get('/api/ideas', {
                    params: {
                        'page[number]': pageNumber,
                        'page[size]': pageSize,
                        append: ['small_image', 'medium_image'],
                        sort: sort,
                    },
                });
                console.log('Fetched posts:', response.data);
                setPosts(response.data.data);
                setTotalPages(response.data.meta.last_page);
                setPostNumber(response.data.meta);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, [sort, pageSize, pageNumber]);

    // Calculate the range of pages to display
    const maxPagesToShow = 4;
    const halfRange = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(1, pageNumber - halfRange);
    let endPage = Math.min(totalPages, pageNumber + halfRange);

    // Adjust start and end pages if they are at the boundaries
    if (pageNumber <= halfRange) {
        endPage = Math.min(maxPagesToShow, totalPages);
    }
    if (pageNumber > totalPages - halfRange) {
        startPage = Math.max(totalPages - maxPagesToShow + 1, 1);
    }

    return (
        <section className="py-8 px-28">
            <div className="flex justify-between items-center mb-4">
                <p>Showing {postNumber?.from}-{postNumber?.to} of {postNumber?.total}</p>
                <div className="flex space-x-4">
                    <div>
                        <label htmlFor="sort" className="mr-2">Sort by:</label>
                        <select
                            id="sort"
                            value={sort}
                            onChange={(e) => setSort(e.target.value as typeof sort)}
                            className="p-2 border rounded"
                        >
                            <option value="-published_at">Newest</option>
                            <option value="published_at">Oldest</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="pageSize" className="mr-2">Show per page:</label>
                        <select
                            id="pageSize"
                            value={pageSize}
                            onChange={(e) => setPageSize(parseInt(e.target.value))}
                            className="p-2 border rounded"
                        >
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
            <div className="mt-8 flex justify-center space-x-4">
                {/* Pagination Controls */}
                {startPage > 1 && (
                    <button
                        onClick={() => setPageNumber(1)}
                        className="p-2 text-orange-600"
                    >
                        1
                    </button>
                )}
                {startPage > 2 && (
                    <span className="p-2">...</span>
                )}
                {[...Array(endPage - startPage + 1)].map((_, index) => (
                    <button
                        key={startPage + index}
                        onClick={() => setPageNumber(startPage + index)}
                        className={`p-2 ${pageNumber === startPage + index ? 'text-white bg-orange-600' : 'text-orange-600'}`}
                    >
                        {startPage + index}
                    </button>
                ))}
                {endPage < totalPages - 1 && (
                    <span className="p-2">...</span>
                )}
                {endPage < totalPages && (
                    <button
                        onClick={() => setPageNumber(totalPages)}
                        className="p-2 text-orange-600"
                    >
                        {totalPages}
                    </button>
                )}
            </div>
        </section>
    );
};

export default PostList;
