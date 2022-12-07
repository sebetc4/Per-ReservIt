import { HomeComponent } from '../client/layout';
import { wrapper } from '../store/store';
import { fetchAllProperties } from '../store/slices/properties.slice';

export default function Home() {

    return <HomeComponent />;
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params, query }) => {
    const currentPage = typeof query.page === 'string' ? +query.page : 1
    await store.dispatch(fetchAllProperties(currentPage));
    return {
        props: {},
    };
});
