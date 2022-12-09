import { HomeComponent } from '../client/layout';
import { wrapper } from '../store/store';
import { fetchAllProperties } from '../store/slices/properties.slice';

export default function Home() {
    return <HomeComponent />;
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params, query }) => {
    const currentPage = typeof query.page === 'string' ? query.page : '1';
    const location = typeof query.location === 'string' ? query.location : null;
    const type = typeof query.type === 'string' ? query.type : 'all'
    const guests = typeof query.guests === 'string' ? query.guests : null
    await store.dispatch(fetchAllProperties({ currentPage, location, type, guests}));
    return {
        props: {},
    };
});
