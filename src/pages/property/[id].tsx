import Head from 'next/head';
import { useAppSelector } from '../../client/hooks/redux.hooks';
import { Property } from '../../client/layout';
import { fetchProperty } from '../../store/slices/property.slice';
import { wrapper } from '../../store/store';

export default function PropertyDetails() {
    const { error, data: property } = useAppSelector((state) => state.property);

    return (
        <>
            <Head>
                <title>{`${property?.name || 'Hébergement'} - Reserv'It`}</title>
            </Head>
            <Property />
        </>
    );
}
export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
    if (typeof params?.id === 'string') {
        await store.dispatch(fetchProperty(params.id));
    }
    return {
        props: {},
    };
});
