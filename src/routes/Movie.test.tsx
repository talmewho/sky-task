import React from 'react';
import renderer, {act} from 'react-test-renderer';

import getMovie1Mock from './mocks/movie-1';

import {getMovie} from '../service/the-movie-db/fetcher';

import Movie from './Movie';

jest.mock('react-router-dom', () => {
    return {useParams: () => ({id: '1'}), Link: ({children, to}: {
        children: React.ReactChildren,
        to: string
    }) => <a href={to}>{children}</a>};
});

jest.mock('../service/the-movie-db/fetcher');
const mockGetMovie = getMovie as jest.MockedFunction<typeof getMovie>;

const waitForUpdate = async () => {
    return act(async () => await new Promise((resolve) => setTimeout(resolve, 0)));
};

describe('Components.Movie', () => {
    beforeEach(() => {
        mockGetMovie.mockClear();
    });

    afterEach(async () => {
        await waitForUpdate();
    });

    it('shows a loading indicator before data is fetched', async () => {
        const component = renderer.create(<Movie />);
        await waitForUpdate();
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('data is fetched and shown', async () => {
        mockGetMovie.mockResolvedValueOnce(getMovie1Mock());

        const component = renderer.create(<Movie />);
        await waitForUpdate();

        expect(mockGetMovie).toBeCalledTimes(1);
        expect(component.toJSON()).toMatchSnapshot();
    });

    it('data fetching throws, error is shown', async () => {
        mockGetMovie.mockRejectedValue(new Error(''));

        const component = renderer.create(<Movie />);
        await waitForUpdate();

        expect(mockGetMovie).toBeCalledTimes(1);
        expect(component.toJSON()).toMatchSnapshot();
    });
});
