import {createContext} from 'react';

interface IEpisode {
    title: string;
    members: string;
    thumbnail: string;
    duration: number;
    url: string;

}

interface IPlayerContextData {
    episodeList: IEpisode[];
    currentEpisodeIndex: number;
    isPlaying: boolean;
    play: (episode: IEpisode) => void;
    togglePlay: () => void;
    setPlayingState: (state: boolean) => void;
}

export const PlayerContext = createContext({} as IPlayerContextData);