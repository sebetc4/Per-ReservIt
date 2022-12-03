import { Property } from '../../client/layout';
import { fetchProperty } from '../../store/slices/property.slice';
import { wrapper } from '../../store/store';

export default function PropertyDetails() {

    return <Property />;
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
    if (typeof params?.id === 'string') {
        await store.dispatch(fetchProperty(params.id));
    }
    return {
        props: {},
    };
});
