import { HomeComponent } from '../client/layout';
import { wrapper } from '../store/store';
import { fetchAllProperties } from '../store/slices/properties.slice';

export default function Home() {

    return <HomeComponent />;
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
    await store.dispatch(fetchAllProperties());
    return {
        props: {},
    };
});
