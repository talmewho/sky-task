import React from 'react';
import {render, act} from '@testing-library/react';

import getMovie1Mock from './mocks/movie-1';

import {getMovie} from '../service/the-movie-db/fetcher';

import Movie from './Movie';

jest.mock('react-router-dom', () => {
    return {useParams: () => ({id: '1'}), Link: ({children, to}: {
        children: React.ReactNode,
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
        const {container} = render(<Movie />);
        await waitForUpdate();
        expect(container).toMatchSnapshot();
    });

    it('data is fetched and shown', async () => {
        mockGetMovie.mockResolvedValueOnce(getMovie1Mock());

        const {container} = render(<Movie />);
        await waitForUpdate();

        expect(mockGetMovie).toBeCalledTimes(1);
        expect(container).toMatchSnapshot();
    });

    it('data fetching throws, error is shown', async () => {
        mockGetMovie.mockRejectedValue(new Error(''));

        const {container} = render(<Movie />);
        await waitForUpdate();

        expect(mockGetMovie).toBeCalledTimes(1);
        expect(container).toMatchSnapshot();
    });
});
