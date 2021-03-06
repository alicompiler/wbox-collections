import React, { useState } from 'react';
import { InfiniteScroll } from '../Collection/InfiniteScroll';
import { CollectionProvider } from '../CollectionProvider/CollectionProvider';
import { Field } from '../Field/Field';
import { HttpFetchOptions } from '../Service/Fetch/HttpFetchService';
import { Table } from '../Factory/TableCollection';
import { DefaultCollectionFactory } from '../Factory/DefaultCollectionFactory';

export function Example() {
    const [url, setUrl] = useState('http://localhost:8080/collection?page=0');

    const dataOptions: HttpFetchOptions = {
        url: url,
        buildDataResult: (res: any) => ({ items: res.data, totalCount: res.totalCount }),
    };
    const fields: Field[] = [
        { name: 'id', title: '#' },
        { name: 'name', title: 'Name' },
        { name: 'age', title: 'Age' },
        { name: 'height', title: 'Height' },
        { name: 'phone', title: 'Phone' },
        { name: 'email', title: 'Email' },
    ];

    const factory = new DefaultCollectionFactory();
    return factory.create({providerOptions: {fetchOptions: dataOptions , fields: fields} , renderOptions: {}});
    return (
        <CollectionProvider fetchOptions={dataOptions} fields={fields}>
            <div>
                <InfiniteScroll>
                    <Table />
                </InfiniteScroll>
            </div>
        </CollectionProvider>
    );
}
