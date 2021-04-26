import {createContext, useContext, useState} from 'react';

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
    isLooping: boolean;
    isShuffling: boolean;
    play: (episode: IEpisode) => void;
    togglePlay: () => void;
    toggleLoop: () => void;
    toggleShuffle: () => void;
    setPlayingState: (state: boolean) => void;
    playList: (list: IEpisode[], index: number) => void;
    playNext: () => void;
    playPrevious: () => void;
    clearPlayerState: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

export const PlayerContext = createContext({} as IPlayerContextData);

export const PlayerContextProvider: React.FC = ({children}) => {
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isShuffling, setIsShuffling] = useState(false);
    
    function play(episode: IEpisode) {
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
    }

    function playList(list: IEpisode[], index: number) {
        setEpisodeList(list);
        setCurrentEpisodeIndex(index);
        setIsPlaying(true);
    }
  
    function togglePlay() {
      setIsPlaying(!isPlaying)
    } 

    function toggleLoop() {
      setIsLooping(!isLooping);
    } 

    function toggleShuffle() {
      setIsShuffling(!isShuffling);
    } 
  
    function setPlayingState(state: boolean) {
      setIsPlaying(state);
    }

    const hasNext = isShuffling || currentEpisodeIndex < episodeList.length - 1;
    const hasPrevious = currentEpisodeIndex !== 0;

    function playNext() {
      if (isShuffling) {
        const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
        setCurrentEpisodeIndex(nextRandomEpisodeIndex);
      } else if (hasNext) {
        setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }
    }

    function playPrevious() {
      if (hasPrevious){
        setCurrentEpisodeIndex(currentEpisodeIndex - 1);
      }

    }

    function clearPlayerState() {
      setEpisodeList([]);
      setCurrentEpisodeIndex(0);
    }
    
    return (
      <PlayerContext.Provider value={{ 
        episodeList, 
        currentEpisodeIndex,
        isLooping,
        isPlaying,
        isShuffling,
        play,
        playList,
        togglePlay,
        setPlayingState,
        playNext,
        playPrevious,
        hasNext,
        hasPrevious,
        toggleLoop,
        toggleShuffle,
        clearPlayerState,
      }}>
        {children}
      </PlayerContext.Provider>
    )
  }

  export const usePlayer = () => {
    return useContext(PlayerContext);
  }