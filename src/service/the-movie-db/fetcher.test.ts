import TheMovieDBFetcher from '../../data-access/TheMovieDBFetcher';
import getMulti1Mock from './mocks/multi-1';
import getMulti1Expected from './mocks/multi-1-default-images-expected';
import getMulti1Expected2 from './mocks/multi-1-mixed-images-expected';
import getSearchPerson1Mock from './mocks/search-person-1';
import getSearchPerson1Expected from './mocks/search-person-1-default-images-expected';
import getSearchPerson1Expected2 from './mocks/search-person-1-mixed-images-expected';
import getSearchMovie1Mock from './mocks/search-movie-1';
import getSearchMovie1Expected from './mocks/search-movie-1-default-images-expected';
import getSearchMovie1Expected2 from './mocks/search-movie-1-mixed-images-expected';
import getSearchShow1Mock from './mocks/search-show-1';
import getSearchShow1Expected from './mocks/search-show-1-default-images-expected';
import getSearchShow1Expected2 from './mocks/search-show-1-mixed-images-expected';

import * as fetcher from './fetcher';
import constants from '../../common/TheMovieDB.constants';

jest.mock('../../data-access/TheMovieDBFetcher');

const MockTheMovieDBFetcher = TheMovieDBFetcher as jest.MockedClass<typeof TheMovieDBFetcher>;

describe('TheMovieDB.Service.Fetcher', () => {
    beforeEach(() => {
        MockTheMovieDBFetcher.prototype.search.mockClear();
        MockTheMovieDBFetcher.prototype.searchShow.mockClear();
        MockTheMovieDBFetcher.prototype.searchPerson.mockClear();
        MockTheMovieDBFetcher.prototype.searchMovie.mockClear();
    });

    it('multi-search data is converted to search results, default images', async () => {
        MockTheMovieDBFetcher.prototype.search.mockResolvedValueOnce(getMulti1Mock());
        const result = await fetcher.search({
            query: 'Ameli',
            filter: constants.mediaType.all,
            page: 1,
            posterImageSize: constants.posterSize.w92,
            profileImageSize: constants.profileSize.w45
        });
        expect(MockTheMovieDBFetcher.prototype.search).toBeCalledTimes(1);
        expect(result).toStrictEqual(getMulti1Expected());
    });

    it('multi-search data is converted to search results, given and default images', async () => {
        MockTheMovieDBFetcher.prototype.search.mockResolvedValueOnce(getMulti1Mock());
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://a.com/image.jpg');
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://b.com/image.jpg');
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://c.com/image.jpg');
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://d.com/image.jpg');
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://e.com/image.jpg');
        const result = await fetcher.search({
            query: 'Ameli',
            filter: constants.mediaType.all,
            page: 1,
            posterImageSize: constants.posterSize.w92,
            profileImageSize: constants.profileSize.w45
        });
        expect(MockTheMovieDBFetcher.prototype.search).toBeCalledTimes(1);
        expect(result).toStrictEqual(getMulti1Expected2());
    });

    it('person search data is converted to search results, default images', async () => {
        MockTheMovieDBFetcher.prototype.searchPerson.mockResolvedValueOnce(getSearchPerson1Mock());
        const result = await fetcher.search({
            query: 'Ameli',
            filter: constants.mediaType.person,
            page: 1,
            posterImageSize: constants.posterSize.w92,
            profileImageSize: constants.profileSize.w45
        });
        expect(MockTheMovieDBFetcher.prototype.searchPerson).toBeCalledTimes(1);
        expect(result).toStrictEqual(getSearchPerson1Expected());
    });

    it('person search data is converted to search results, given and default images', async () => {
        MockTheMovieDBFetcher.prototype.searchPerson.mockResolvedValueOnce(getSearchPerson1Mock());
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://a.com/image.jpg');
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://b.com/image.jpg');
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://c.com/image.jpg');
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://d.com/image.jpg');
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://e.com/image.jpg');
        const result = await fetcher.search({
            query: 'Ameli',
            filter: constants.mediaType.person,
            page: 1,
            posterImageSize: constants.posterSize.w92,
            profileImageSize: constants.profileSize.w45
        });
        expect(MockTheMovieDBFetcher.prototype.searchPerson).toBeCalledTimes(1);
        expect(result).toStrictEqual(getSearchPerson1Expected2());
    });

    it('movie search data is converted to search results, default images', async () => {
        MockTheMovieDBFetcher.prototype.searchMovie.mockResolvedValueOnce(getSearchMovie1Mock());
        const result = await fetcher.search({
            query: 'Ameli',
            filter: constants.mediaType.movie,
            page: 1,
            posterImageSize: constants.posterSize.w92,
            profileImageSize: constants.profileSize.w45
        });
        expect(MockTheMovieDBFetcher.prototype.searchMovie).toBeCalledTimes(1);
        expect(result).toStrictEqual(getSearchMovie1Expected());
    });

    it('movie search data is converted to search results, given and default images', async () => {
        MockTheMovieDBFetcher.prototype.searchMovie.mockResolvedValueOnce(getSearchMovie1Mock());
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://a.com/image.jpg');
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://b.com/image.jpg');
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://c.com/image.jpg');
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://d.com/image.jpg');
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://e.com/image.jpg');
        const result = await fetcher.search({
            query: 'Ameli',
            filter: constants.mediaType.movie,
            page: 1,
            posterImageSize: constants.posterSize.w92,
            profileImageSize: constants.profileSize.w45
        });
        expect(MockTheMovieDBFetcher.prototype.searchMovie).toBeCalledTimes(1);
        expect(result).toStrictEqual(getSearchMovie1Expected2());
    });

    it('tv search data is converted to search results, default images', async () => {
        MockTheMovieDBFetcher.prototype.searchShow.mockResolvedValueOnce(getSearchShow1Mock());
        const result = await fetcher.search({
            query: 'Ameli',
            filter: constants.mediaType.tv,
            page: 1,
            posterImageSize: constants.posterSize.w92,
            profileImageSize: constants.profileSize.w45
        });
        expect(MockTheMovieDBFetcher.prototype.searchShow).toBeCalledTimes(1);
        expect(result).toStrictEqual(getSearchShow1Expected());
    });

    it('tv search data is converted to search results, given and default images', async () => {
        MockTheMovieDBFetcher.prototype.searchShow.mockResolvedValueOnce(getSearchShow1Mock());
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://a.com/image.jpg');
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://b.com/image.jpg');
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://c.com/image.jpg');
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://d.com/image.jpg');
        MockTheMovieDBFetcher.prototype.getImageURL.mockResolvedValueOnce('http://e.com/image.jpg');
        const result = await fetcher.search({
            query: 'Ameli',
            filter: constants.mediaType.tv,
            page: 1,
            posterImageSize: constants.posterSize.w92,
            profileImageSize: constants.profileSize.w45
        });
        expect(MockTheMovieDBFetcher.prototype.searchShow).toBeCalledTimes(1);
        expect(result).toStrictEqual(getSearchShow1Expected2());
    });
});
