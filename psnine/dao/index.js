'use strict';
import topicParser from '../parser/community'
import geneParser from '../parser/gene'
import battleParser from '../parser/battle'
import userParser from '../parser/user'
import messageParser from '../parser/user/message'
import qaParser from '../parser/qa'
import gamesParser from '../parser/game'
import ranksParser from '../parser/rank'
import topicApiParser from '../parser/topic/topic'
import battleTopicParser from '../parser/battle/battle'
import topicContentApiParser from '../parser/topic/topicContent'
import topicCommentApiParser from '../parser/topic/topicComment'
import topicCommentSnapshotApiParser from '../parser/topic/topicCommentSnapshot'
import gameParser from '../parser/game/game'
import homeParser from '../parser/user/home'
import trophyParser from '../parser/game/trophy'
import myGameParser from '../parser/user/myGame'
import gameTopicParser from '../parser/game/gameTopic'
import favoriteParser from '../parser/user/favorite'
import qaTopicParser from '../parser/qa/qa'
import userBoardParser from '../parser/user/comment'


const safeFetch = function(reqUrl) {
  return new Promise((resolve, reject) => {
    let timeout = setTimeout(() => reject('request time out'), 20000);
    fetch(reqUrl).then((response) => {
      clearTimeout(timeout);
      const text = response.text()
      return resolve(text);
    }).catch((error) => {
      console.warn(error)
      clearTimeout(timeout);
      resolve([]);
    });
  });
};

const host = `http://120.55.124.66`;

const webHost = `http://psnine.com`;

const getTopicsAPI = (page, type) => !type ? `${webHost}/topic?page=${page}&node=${type}` : `${webHost}/node/${type}?page=${page}`;

const getGenesAPI = (page, type) => `${webHost}/gene?page=${page}&type=${type}`;

export const fetchTopics = (page = 1,type = '') => safeFetch(getTopicsAPI(page,type)).then(res => topicParser(res));

export const fetchGenes = (page = 1, type = 'all') => safeFetch(getGenesAPI(page,type)).then(res => geneParser(res));

export const getTopicAPI = uri => safeFetch(uri).then(res => topicApiParser(res))

export const getBattleAPI = uri => safeFetch(uri).then(res => battleTopicParser(res))

export const getGameAPI = uri => safeFetch(uri).then(res => gameParser(res))

export const getTrophyAPI = uri => safeFetch(uri).then(res => trophyParser(res))

export const getUserBoardCommentAPI = uri => safeFetch(uri).then(res => userBoardParser(res))

export const getFavoriteAPI = uri => safeFetch(uri).then(res => favoriteParser(res))

export const getQaTopicAPI = uri => safeFetch(uri).then(res => qaTopicParser(res))

export const getMyGameAPI = uri => safeFetch(uri).then(res => myGameParser(res, uri.split('/').pop()))

export const getGameTopicAPI = uri => safeFetch(uri).then(res => gameTopicParser(res, uri.split('/').pop()))

export const getHomeAPI = uri => safeFetch(uri).then(res => homeParser(res, uri.split('/').pop()))

export const getTopicContentAPI = uri => safeFetch(uri).then(res => topicContentApiParser(res))

export const getTopicCommentAPI = uri => safeFetch(uri).then(res => topicCommentApiParser(res))

export const getTopicCommentSnapshotAPI = uri => safeFetch(uri).then(res => topicCommentSnapshotApiParser(res))

export const getTopicURL = id => webHost + '/topic/' + id; 

export const getGeneURL = id => webHost + '/gene/' + id;

export const getHappyPlusOneURL = id => webHost + '/youhui';

export const getDealURL = id => webHost + '/trade';

export const getStoreURL = id => webHost + '/store';

export const pngPrefix = 'http://photo.d7vg.com/'

export const getMessagesAPI = id => webHost + '/my/notice';

export const fetchMessages = id => safeFetch(getMessagesAPI(id)).then(res => messageParser(res));

export const getBattlesAPI = id => webHost + '/battle';

export const fetchBattles = () => safeFetch(getBattlesAPI()).then(res => battleParser(res));

export const getBattleURL = id => webHost + '/battle/' + id;

export const getGamePngURL = id => `${pngPrefix}/psngame/${id}.png@91w.png`

export const getHomeURL = id => `${webHost}/psnid/${id}`;

export const getRankURL = () => `${webHost}/psnid`;

export const getMyGameURL = id => `${webHost}/psnid/${id}/psngame?page=1`;

export const fetchUser = id => safeFetch(getHomeURL(id)).then(res => userParser(res, id))

export const getQasAPI = (page, type, sort) => webHost + `/qa?page=${page}&type=${type}&ob=${sort}`

export const fetchQuestion = (page = 1, type = 'all', sort = 'obdate') => safeFetch(getQasAPI(page, type, sort)).then(res => qaParser(res));

export const getQAUrl = id => `${webHost}/qa/${id}`

export const fetchGames = (page = 1, sort = 'newest', pf = 'all', dlc = 'all') => safeFetch(getGamesAPI(page, sort, pf, dlc)).then(res => gamesParser(res));

export const fetchRanks = (page = 1, sort = 'point', server = 'hk', cheat = '0') => safeFetch(getRanksAPI(page, sort, server, cheat)).then(res => ranksParser(res));

export const getUserUrl = id => `${webHost}/psnid/${id}`

export const getRanksAPI = (page, sort, server, cheat) => `${webHost}/psnid?page=${page}&ob=${sort}&server=${server}&cheat=${cheat}`

export const getGamesAPI = (page, sort, pf, dlc) => `${webHost}/psngame?page=${page}&ob=${sort}&pf=${pf}&dlc=${dlc}`

export const getGameUrl = id => `${webHost}/psngame/${id}`