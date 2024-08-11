// app/ideas/page.tsx
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import PostList from '../../components/PostLIst';

export default function IdeasPage() {
    return (
        <>
            <Header />
            <Banner />
            <PostList />
        </>
    );
}
