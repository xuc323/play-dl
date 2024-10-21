var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// play-dl/index.ts
var play_dl_exports = {};
__export(play_dl_exports, {
  DeezerAlbum: () => DeezerAlbum,
  DeezerPlaylist: () => DeezerPlaylist,
  DeezerTrack: () => DeezerTrack,
  SoundCloudPlaylist: () => SoundCloudPlaylist,
  SoundCloudStream: () => SoundCloudStream,
  SoundCloudTrack: () => SoundCloudTrack,
  SpotifyAlbum: () => SpotifyAlbum,
  SpotifyPlaylist: () => SpotifyPlaylist,
  SpotifyTrack: () => SpotifyTrack,
  YouTubeChannel: () => YouTubeChannel,
  YouTubePlayList: () => YouTubePlayList,
  YouTubeVideo: () => YouTubeVideo,
  attachListeners: () => attachListeners,
  authorization: () => authorization,
  decipher_info: () => decipher_info,
  deezer: () => deezer,
  default: () => play_dl_default,
  dz_advanced_track_search: () => dz_advanced_track_search,
  dz_validate: () => dz_validate,
  extractID: () => extractID,
  getFreeClientID: () => getFreeClientID,
  is_expired: () => is_expired,
  playlist_info: () => playlist_info,
  refreshToken: () => refreshToken,
  search: () => search,
  setToken: () => setToken,
  so_validate: () => so_validate,
  soundcloud: () => soundcloud,
  sp_validate: () => sp_validate,
  spotify: () => spotify,
  stream: () => stream3,
  stream_from_info: () => stream_from_info3,
  validate: () => validate,
  video_basic_info: () => video_basic_info,
  video_info: () => video_info,
  yt_validate: () => yt_validate
});
module.exports = __toCommonJS(play_dl_exports);

// play-dl/Request/index.ts
var import_node_https = require("https");
var import_node_url = require("url");
var import_node_zlib = require("zlib");

// play-dl/YouTube/utils/cookie.ts
var import_node_fs = require("fs");
var youtubeData;
if ((0, import_node_fs.existsSync)(".data/youtube.data")) {
  youtubeData = JSON.parse((0, import_node_fs.readFileSync)(".data/youtube.data", "utf-8"));
  youtubeData.file = true;
}
function getCookies() {
  let result = "";
  if (!youtubeData?.cookie)
    return void 0;
  for (const [key, value] of Object.entries(youtubeData.cookie)) {
    result += `${key}=${value};`;
  }
  return result;
}
function setCookie(key, value) {
  if (!youtubeData?.cookie)
    return false;
  key = key.trim();
  value = value.trim();
  Object.assign(youtubeData.cookie, { [key]: value });
  return true;
}
function uploadCookie() {
  if (youtubeData.cookie && youtubeData.file)
    (0, import_node_fs.writeFileSync)(".data/youtube.data", JSON.stringify(youtubeData, void 0, 4));
}
function setCookieToken(options) {
  let cook = options.cookie;
  let cookie = {};
  cook.split(";").forEach((x) => {
    const arr = x.split("=");
    if (arr.length <= 1)
      return;
    const key = arr.shift()?.trim();
    const value = arr.join("=").trim();
    Object.assign(cookie, { [key]: value });
  });
  youtubeData = { cookie };
  youtubeData.file = false;
}
function cookieHeaders(headCookie) {
  if (!youtubeData?.cookie)
    return;
  headCookie.forEach((x) => {
    x.split(";").forEach((z) => {
      const arr = z.split("=");
      if (arr.length <= 1)
        return;
      const key = arr.shift()?.trim();
      const value = arr.join("=").trim();
      setCookie(key, value);
    });
  });
  uploadCookie();
}

// play-dl/Request/useragents.json
var useragents_default = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36 Edg/101.0.1210.53",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36 Edg/99.0.1150.30",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.64 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/101.0.4951.67 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 YaBrowser/19.10.3.281 Yowser/2.5 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.102 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/537.36",
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36"
];

// play-dl/Request/useragent.ts
function setUserAgent(array) {
  useragents_default.push(...array);
}
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomUserAgent() {
  const random = getRandomInt(0, useragents_default.length - 1);
  return useragents_default[random];
}

// play-dl/Request/index.ts
function request_stream(req_url, options = { method: "GET" }) {
  return new Promise(async (resolve, reject) => {
    let res = await https_getter(req_url, options).catch((err) => err);
    if (res instanceof Error) {
      reject(res);
      return;
    }
    if (Number(res.statusCode) >= 300 && Number(res.statusCode) < 400) {
      res = await request_stream(res.headers.location, options);
    }
    resolve(res);
  });
}
function internalRequest(req_url, options = { method: "GET" }) {
  return new Promise(async (resolve, reject) => {
    let res = await https_getter(req_url, options).catch((err) => err);
    if (res instanceof Error) {
      reject(res);
      return;
    }
    if (Number(res.statusCode) >= 300 && Number(res.statusCode) < 400) {
      res = await internalRequest(res.headers.location, options);
    } else if (Number(res.statusCode) > 400) {
      reject(new Error(`Got ${res.statusCode} from the request`));
      return;
    }
    resolve(res);
  });
}
function request(req_url, options = { method: "GET" }) {
  return new Promise(async (resolve, reject) => {
    let cookies_added = false;
    if (options.cookies) {
      let cook = getCookies();
      if (typeof cook === "string" && options.headers) {
        Object.assign(options.headers, { cookie: cook });
        cookies_added = true;
      }
    }
    if (options.cookieJar) {
      const cookies = [];
      for (const cookie of Object.entries(options.cookieJar)) {
        cookies.push(cookie.join("="));
      }
      if (cookies.length !== 0) {
        if (!options.headers)
          options.headers = {};
        const existingCookies = cookies_added ? `; ${options.headers.cookie}` : "";
        Object.assign(options.headers, { cookie: `${cookies.join("; ")}${existingCookies}` });
      }
    }
    if (options.headers) {
      options.headers = {
        ...options.headers,
        "accept-encoding": "gzip, deflate, br",
        "user-agent": getRandomUserAgent()
      };
    }
    const res = await internalRequest(req_url, options).catch((err) => err);
    if (res instanceof Error) {
      reject(res);
      return;
    }
    if (res.headers && res.headers["set-cookie"]) {
      if (options.cookieJar) {
        for (const cookie of res.headers["set-cookie"]) {
          const parts = cookie.split(";")[0].trim().split("=");
          options.cookieJar[parts.shift()] = parts.join("=");
        }
      }
      if (cookies_added) {
        cookieHeaders(res.headers["set-cookie"]);
      }
    }
    const data = [];
    let decoder = void 0;
    const encoding = res.headers["content-encoding"];
    if (encoding === "gzip")
      decoder = (0, import_node_zlib.createGunzip)();
    else if (encoding === "br")
      decoder = (0, import_node_zlib.createBrotliDecompress)();
    else if (encoding === "deflate")
      decoder = (0, import_node_zlib.createDeflate)();
    if (decoder) {
      res.pipe(decoder);
      decoder.setEncoding("utf-8");
      decoder.on("data", (c) => data.push(c));
      decoder.on("end", () => resolve(data.join("")));
    } else {
      res.setEncoding("utf-8");
      res.on("data", (c) => data.push(c));
      res.on("end", () => resolve(data.join("")));
    }
  });
}
function request_resolve_redirect(url) {
  return new Promise(async (resolve, reject) => {
    let res = await https_getter(url, { method: "HEAD" }).catch((err) => err);
    if (res instanceof Error) {
      reject(res);
      return;
    }
    const statusCode = Number(res.statusCode);
    if (statusCode < 300) {
      resolve(url);
    } else if (statusCode < 400) {
      const resolved = await request_resolve_redirect(res.headers.location).catch((err) => err);
      if (resolved instanceof Error) {
        reject(resolved);
        return;
      }
      resolve(resolved);
    } else {
      reject(new Error(`${res.statusCode}: ${res.statusMessage}, ${url}`));
    }
  });
}
function request_content_length(url) {
  return new Promise(async (resolve, reject) => {
    let res = await https_getter(url, { method: "HEAD" }).catch((err) => err);
    if (res instanceof Error) {
      reject(res);
      return;
    }
    const statusCode = Number(res.statusCode);
    if (statusCode < 300) {
      resolve(Number(res.headers["content-length"]));
    } else if (statusCode < 400) {
      const newURL = await request_resolve_redirect(res.headers.location).catch((err) => err);
      if (newURL instanceof Error) {
        reject(newURL);
        return;
      }
      const res2 = await request_content_length(newURL).catch((err) => err);
      if (res2 instanceof Error) {
        reject(res2);
        return;
      }
      resolve(res2);
    } else {
      reject(new Error(`Failed to get content length with error: ${res.statusCode}, ${res.statusMessage}, ${url}`));
    }
  });
}
function https_getter(req_url, options = {}) {
  return new Promise((resolve, reject) => {
    const s = new import_node_url.URL(req_url);
    options.method ??= "GET";
    const req_options = {
      host: s.hostname,
      path: s.pathname + s.search,
      headers: options.headers ?? {},
      method: options.method
    };
    const req = (0, import_node_https.request)(req_options, resolve);
    req.on("error", (err) => {
      reject(err);
    });
    if (options.method === "POST")
      req.write(options.body);
    req.end();
  });
}

// play-dl/YouTube/classes/LiveStream.ts
var import_node_stream = require("stream");

// play-dl/YouTube/utils/cipher.ts
var import_node_url2 = require("url");
var var_js = "[a-zA-Z_\\$]\\w*";
var singlequote_js = `'[^'\\\\]*(:?\\\\[\\s\\S][^'\\\\]*)*'`;
var duoblequote_js = `"[^"\\\\]*(:?\\\\[\\s\\S][^"\\\\]*)*"`;
var quote_js = `(?:${singlequote_js}|${duoblequote_js})`;
var key_js = `(?:${var_js}|${quote_js})`;
var prop_js = `(?:\\.${var_js}|\\[${quote_js}\\])`;
var empty_js = `(?:''|"")`;
var reverse_function = ":function\\(a\\)\\{(?:return )?a\\.reverse\\(\\)\\}";
var slice_function = ":function\\(a,b\\)\\{return a\\.slice\\(b\\)\\}";
var splice_function = ":function\\(a,b\\)\\{a\\.splice\\(0,b\\)\\}";
var swap_function = ":function\\(a,b\\)\\{var c=a\\[0\\];a\\[0\\]=a\\[b(?:%a\\.length)?\\];a\\[b(?:%a\\.length)?\\]=c(?:;return a)?\\}";
var obj_regexp = new RegExp(`var (${var_js})=\\{((?:(?:${key_js}${reverse_function}|${key_js}${slice_function}|${key_js}${splice_function}|${key_js}${swap_function}),?\\r?\\n?)+)\\};`);
var function_regexp = new RegExp(`${`function(?: ${var_js})?\\(a\\)\\{a=a\\.split\\(${empty_js}\\);\\s*((?:(?:a=)?${var_js}`}${prop_js}\\(a,\\d+\\);)+)return a\\.join\\(${empty_js}\\)\\}`);
var reverse_regexp = new RegExp(`(?:^|,)(${key_js})${reverse_function}`, "m");
var slice_regexp = new RegExp(`(?:^|,)(${key_js})${slice_function}`, "m");
var splice_regexp = new RegExp(`(?:^|,)(${key_js})${splice_function}`, "m");
var swap_regexp = new RegExp(`(?:^|,)(${key_js})${swap_function}`, "m");
function js_tokens(body) {
  const function_action = function_regexp.exec(body);
  const object_action = obj_regexp.exec(body);
  if (!function_action || !object_action)
    return null;
  const object = object_action[1].replace(/\$/g, "\\$");
  const object_body = object_action[2].replace(/\$/g, "\\$");
  const function_body = function_action[1].replace(/\$/g, "\\$");
  let result = reverse_regexp.exec(object_body);
  const reverseKey = result && result[1].replace(/\$/g, "\\$").replace(/\$|^'|^"|'$|"$/g, "");
  result = slice_regexp.exec(object_body);
  const sliceKey = result && result[1].replace(/\$/g, "\\$").replace(/\$|^'|^"|'$|"$/g, "");
  result = splice_regexp.exec(object_body);
  const spliceKey = result && result[1].replace(/\$/g, "\\$").replace(/\$|^'|^"|'$|"$/g, "");
  result = swap_regexp.exec(object_body);
  const swapKey = result && result[1].replace(/\$/g, "\\$").replace(/\$|^'|^"|'$|"$/g, "");
  const keys = `(${[reverseKey, sliceKey, spliceKey, swapKey].join("|")})`;
  const myreg = `(?:a=)?${object}(?:\\.${keys}|\\['${keys}'\\]|\\["${keys}"\\])\\(a,(\\d+)\\)`;
  const tokenizeRegexp = new RegExp(myreg, "g");
  const tokens = [];
  while ((result = tokenizeRegexp.exec(function_body)) !== null) {
    const key = result[1] || result[2] || result[3];
    switch (key) {
      case swapKey:
        tokens.push(`sw${result[4]}`);
        break;
      case reverseKey:
        tokens.push("rv");
        break;
      case sliceKey:
        tokens.push(`sl${result[4]}`);
        break;
      case spliceKey:
        tokens.push(`sp${result[4]}`);
        break;
    }
  }
  return tokens;
}
function deciper_signature(tokens, signature) {
  let sig = signature.split("");
  const len = tokens.length;
  for (let i = 0; i < len; i++) {
    let token = tokens[i], pos;
    switch (token.slice(0, 2)) {
      case "sw":
        pos = parseInt(token.slice(2));
        swappositions(sig, pos);
        break;
      case "rv":
        sig.reverse();
        break;
      case "sl":
        pos = parseInt(token.slice(2));
        sig = sig.slice(pos);
        break;
      case "sp":
        pos = parseInt(token.slice(2));
        sig.splice(0, pos);
        break;
    }
  }
  return sig.join("");
}
function swappositions(array, position) {
  const first = array[0];
  array[0] = array[position];
  array[position] = first;
}
function download_url(format, sig) {
  if (!format.url)
    return;
  const decoded_url = decodeURIComponent(format.url);
  const parsed_url = new import_node_url2.URL(decoded_url);
  parsed_url.searchParams.set("ratebypass", "yes");
  if (sig) {
    parsed_url.searchParams.set(format.sp || "signature", sig);
  }
  format.url = parsed_url.toString();
}
async function format_decipher(formats, html5player) {
  const body = await request(html5player);
  const tokens = js_tokens(body);
  formats.forEach((format) => {
    const cipher = format.signatureCipher || format.cipher;
    if (cipher) {
      const params = Object.fromEntries(new import_node_url2.URLSearchParams(cipher));
      Object.assign(format, params);
      delete format.signatureCipher;
      delete format.cipher;
    }
    if (tokens && format.s) {
      const sig = deciper_signature(tokens, format.s);
      download_url(format, sig);
      delete format.s;
      delete format.sp;
    }
  });
  return formats;
}

// play-dl/YouTube/classes/Channel.ts
var YouTubeChannel = class {
  name;
  verified;
  artist;
  id;
  type;
  url;
  icons;
  subscribers;
  constructor(data = {}) {
    if (!data)
      throw new Error(`Cannot instantiate the ${this.constructor.name} class without data!`);
    this.type = "channel";
    this.name = data.name || null;
    this.verified = !!data.verified || false;
    this.artist = !!data.artist || false;
    this.id = data.id || null;
    this.url = data.url || null;
    this.icons = data.icons || [{ url: null, width: 0, height: 0 }];
    this.subscribers = data.subscribers || null;
  }
  iconURL(options = { size: 0 }) {
    if (typeof options.size !== "number" || options.size < 0)
      throw new Error("invalid icon size");
    if (!this.icons?.[0]?.url)
      return void 0;
    const def = this.icons?.[0]?.url.split("=s")[1].split("-c")[0];
    return this.icons?.[0]?.url.replace(`=s${def}-c`, `=s${options.size}-c`);
  }
  toString() {
    return this.name || "";
  }
  toJSON() {
    return {
      name: this.name,
      verified: this.verified,
      artist: this.artist,
      id: this.id,
      url: this.url,
      icons: this.icons,
      type: this.type,
      subscribers: this.subscribers
    };
  }
};

// play-dl/YouTube/classes/Thumbnail.ts
var YouTubeThumbnail = class {
  url;
  width;
  height;
  constructor(data) {
    this.url = data.url;
    this.width = data.width;
    this.height = data.height;
  }
  toJSON() {
    return {
      url: this.url,
      width: this.width,
      height: this.height
    };
  }
};

// play-dl/YouTube/classes/Video.ts
var YouTubeVideo = class {
  id;
  url;
  type;
  title;
  description;
  durationRaw;
  durationInSec;
  uploadedAt;
  liveAt;
  upcoming;
  views;
  thumbnails;
  channel;
  likes;
  live;
  private;
  tags;
  discretionAdvised;
  music;
  chapters;
  constructor(data) {
    if (!data)
      throw new Error(`Can not initiate ${this.constructor.name} without data`);
    this.id = data.id || void 0;
    this.url = `https://www.youtube.com/watch?v=${this.id}`;
    this.type = "video";
    this.title = data.title || void 0;
    this.description = data.description || void 0;
    this.durationRaw = data.duration_raw || "0:00";
    this.durationInSec = (data.duration < 0 ? 0 : data.duration) || 0;
    this.uploadedAt = data.uploadedAt || void 0;
    this.liveAt = data.liveAt || void 0;
    this.upcoming = data.upcoming;
    this.views = parseInt(data.views) || 0;
    const thumbnails = [];
    for (const thumb of data.thumbnails) {
      thumbnails.push(new YouTubeThumbnail(thumb));
    }
    this.thumbnails = thumbnails || [];
    this.channel = new YouTubeChannel(data.channel) || {};
    this.likes = data.likes || 0;
    this.live = !!data.live;
    this.private = !!data.private;
    this.tags = data.tags || [];
    this.discretionAdvised = data.discretionAdvised ?? void 0;
    this.music = data.music || [];
    this.chapters = data.chapters || [];
  }
  toString() {
    return this.url || "";
  }
  toJSON() {
    return {
      id: this.id,
      url: this.url,
      title: this.title,
      description: this.description,
      durationInSec: this.durationInSec,
      durationRaw: this.durationRaw,
      uploadedAt: this.uploadedAt,
      thumbnail: this.thumbnails[this.thumbnails.length - 1].toJSON() || this.thumbnails,
      channel: this.channel,
      views: this.views,
      tags: this.tags,
      likes: this.likes,
      live: this.live,
      private: this.private,
      discretionAdvised: this.discretionAdvised,
      music: this.music,
      chapters: this.chapters
    };
  }
};

// play-dl/YouTube/classes/Playlist.ts
var BASE_API = "https://www.youtube.com/youtubei/v1/browse?key=";
var YouTubePlayList = class {
  id;
  title;
  type;
  videoCount;
  lastUpdate;
  views;
  url;
  link;
  channel;
  thumbnail;
  videos;
  fetched_videos;
  _continuation = {};
  __count;
  constructor(data, searchResult = false) {
    if (!data)
      throw new Error(`Cannot instantiate the ${this.constructor.name} class without data!`);
    this.__count = 0;
    this.fetched_videos = /* @__PURE__ */ new Map();
    this.type = "playlist";
    if (searchResult)
      this.__patchSearch(data);
    else
      this.__patch(data);
  }
  __patch(data) {
    this.id = data.id || void 0;
    this.url = data.url || void 0;
    this.title = data.title || void 0;
    this.videoCount = data.videoCount || 0;
    this.lastUpdate = data.lastUpdate || void 0;
    this.views = data.views || 0;
    this.link = data.link || void 0;
    this.channel = new YouTubeChannel(data.channel) || void 0;
    this.thumbnail = data.thumbnail ? new YouTubeThumbnail(data.thumbnail) : void 0;
    this.videos = data.videos || [];
    this.__count++;
    this.fetched_videos.set(`${this.__count}`, this.videos);
    this._continuation.api = data.continuation?.api ?? void 0;
    this._continuation.token = data.continuation?.token ?? void 0;
    this._continuation.clientVersion = data.continuation?.clientVersion ?? "<important data>";
  }
  __patchSearch(data) {
    this.id = data.id || void 0;
    this.url = this.id ? `https://www.youtube.com/playlist?list=${this.id}` : void 0;
    this.title = data.title || void 0;
    this.thumbnail = new YouTubeThumbnail(data.thumbnail) || void 0;
    this.channel = data.channel || void 0;
    this.videos = [];
    this.videoCount = data.videos || 0;
    this.link = void 0;
    this.lastUpdate = void 0;
    this.views = 0;
  }
  async next(limit = Infinity) {
    if (!this._continuation || !this._continuation.token)
      return [];
    const nextPage = await request(`${BASE_API}${this._continuation.api}&prettyPrint=false`, {
      method: "POST",
      body: JSON.stringify({
        continuation: this._continuation.token,
        context: {
          client: {
            utcOffsetMinutes: 0,
            gl: "US",
            hl: "en",
            clientName: "WEB",
            clientVersion: this._continuation.clientVersion
          },
          user: {},
          request: {}
        }
      })
    });
    const contents = JSON.parse(nextPage)?.onResponseReceivedActions[0]?.appendContinuationItemsAction?.continuationItems;
    if (!contents)
      return [];
    const playlist_videos = getPlaylistVideos(contents, limit);
    this.fetched_videos.set(`${this.__count}`, playlist_videos);
    this._continuation.token = getContinuationToken(contents);
    return playlist_videos;
  }
  async fetch(max = Infinity) {
    const continuation = this._continuation.token;
    if (!continuation)
      return this;
    if (max < 1)
      max = Infinity;
    while (typeof this._continuation.token === "string" && this._continuation.token.length) {
      this.__count++;
      const res = await this.next();
      max -= res.length;
      if (max <= 0)
        break;
      if (!res.length)
        break;
    }
    return this;
  }
  page(number) {
    if (!number)
      throw new Error("Page number is not provided");
    if (!this.fetched_videos.has(`${number}`))
      throw new Error("Given Page number is invalid");
    return this.fetched_videos.get(`${number}`);
  }
  get total_pages() {
    return this.fetched_videos.size;
  }
  get total_videos() {
    const page_number = this.total_pages;
    return (page_number - 1) * 100 + this.fetched_videos.get(`${page_number}`).length;
  }
  async all_videos() {
    await this.fetch();
    const videos = [];
    for (const page of this.fetched_videos.values())
      videos.push(...page);
    return videos;
  }
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      thumbnail: this.thumbnail?.toJSON() || this.thumbnail,
      channel: this.channel,
      url: this.url,
      videos: this.videos
    };
  }
};

// play-dl/YouTube/utils/extractor.ts
var import_node_url3 = require("url");
var video_id_pattern = /^[a-zA-Z\d_-]{11,12}$/;
var playlist_id_pattern = /^(PL|UU|LL|RD|OL)[a-zA-Z\d_-]{10,}$/;
var DEFAULT_API_KEY = "AIzaSyAO_FJ2SlqU8Q4STEHLGCilw_Y9_11qcW8";
var video_pattern = /^((?:https?:)?\/\/)?(?:(?:www|m|music)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|shorts\/|embed\/|live\/|v\/)?)([\w\-]+)(\S+)?$/;
var playlist_pattern = /^((?:https?:)?\/\/)?(?:(?:www|m|music)\.)?((?:youtube\.com|youtu.be))\/(?:(playlist|watch))?(.*)?((\?|\&)list=)(PL|UU|LL|RD|OL)[a-zA-Z\d_-]{10,}(&.*)?$/;
function yt_validate(url) {
  const url_ = url.trim();
  if (url_.indexOf("list=") === -1) {
    if (url_.startsWith("https")) {
      if (url_.match(video_pattern)) {
        let id;
        if (url_.includes("youtu.be/"))
          id = url_.split("youtu.be/")[1].split(/(\?|\/|&)/)[0];
        else if (url_.includes("youtube.com/embed/"))
          id = url_.split("youtube.com/embed/")[1].split(/(\?|\/|&)/)[0];
        else if (url_.includes("youtube.com/shorts/"))
          id = url_.split("youtube.com/shorts/")[1].split(/(\?|\/|&)/)[0];
        else
          id = url_.split("watch?v=")[1]?.split(/(\?|\/|&)/)[0];
        if (id?.match(video_id_pattern))
          return "video";
        else
          return false;
      } else
        return false;
    } else {
      if (url_.match(video_id_pattern))
        return "video";
      else if (url_.match(playlist_id_pattern))
        return "playlist";
      else
        return "search";
    }
  } else {
    if (!url_.match(playlist_pattern))
      return yt_validate(url_.replace(/(\?|\&)list=[^&]*/, ""));
    else
      return "playlist";
  }
}
function extractVideoId(urlOrId) {
  if (urlOrId.startsWith("https://") && urlOrId.match(video_pattern)) {
    let id;
    if (urlOrId.includes("youtu.be/")) {
      id = urlOrId.split("youtu.be/")[1].split(/(\?|\/|&)/)[0];
    } else if (urlOrId.includes("youtube.com/embed/")) {
      id = urlOrId.split("youtube.com/embed/")[1].split(/(\?|\/|&)/)[0];
    } else if (urlOrId.includes("youtube.com/shorts/")) {
      id = urlOrId.split("youtube.com/shorts/")[1].split(/(\?|\/|&)/)[0];
    } else if (urlOrId.includes("youtube.com/live/")) {
      id = urlOrId.split("youtube.com/live/")[1].split(/(\?|\/|&)/)[0];
    } else {
      id = (urlOrId.split("watch?v=")[1] ?? urlOrId.split("&v=")[1]).split(/(\?|\/|&)/)[0];
    }
    if (id.match(video_id_pattern))
      return id;
  } else if (urlOrId.match(video_id_pattern)) {
    return urlOrId;
  }
  return false;
}
function extractID(url) {
  const check = yt_validate(url);
  if (!check || check === "search")
    throw new Error("This is not a YouTube url or videoId or PlaylistID");
  const url_ = url.trim();
  if (url_.startsWith("https")) {
    if (url_.indexOf("list=") === -1) {
      const video_id = extractVideoId(url_);
      if (!video_id)
        throw new Error("This is not a YouTube url or videoId or PlaylistID");
      return video_id;
    } else {
      return url_.split("list=")[1].split("&")[0];
    }
  } else
    return url_;
}
async function video_basic_info(url, options = {}) {
  if (typeof url !== "string")
    throw new Error("url parameter is not a URL string or a string of HTML");
  const url_ = url.trim();
  let body;
  const cookieJar = {};
  if (options.htmldata) {
    body = url_;
  } else {
    const video_id = extractVideoId(url_);
    if (!video_id)
      throw new Error("This is not a YouTube Watch URL");
    const new_url = `https://www.youtube.com/watch?v=${video_id}&has_verified=1`;
    body = await request(new_url, {
      headers: {
        "accept-language": options.language || "en-US;q=0.9"
      },
      cookies: true,
      cookieJar
    });
  }
  if (body.indexOf("Our systems have detected unusual traffic from your computer network.") !== -1)
    throw new Error("Captcha page: YouTube has detected that you are a bot!");
  const player_data = body.split("var ytInitialPlayerResponse = ")?.[1]?.split(";<\/script>")[0].split(/(?<=}}});\s*(var|const|let)\s/)[0];
  if (!player_data)
    throw new Error("Initial Player Response Data is undefined.");
  const initial_data = body.split("var ytInitialData = ")?.[1]?.split(";<\/script>")[0].split(/;\s*(var|const|let)\s/)[0];
  if (!initial_data)
    throw new Error("Initial Response Data is undefined.");
  const player_response = JSON.parse(player_data);
  const initial_response = JSON.parse(initial_data);
  const vid = player_response.videoDetails;
  let discretionAdvised = false;
  let upcoming = false;
  if (player_response.playabilityStatus.status !== "OK") {
    if (player_response.playabilityStatus.status === "CONTENT_CHECK_REQUIRED") {
      if (options.htmldata)
        throw new Error(`Accepting the viewer discretion is not supported when using htmldata, video: ${vid.videoId}`);
      discretionAdvised = true;
      const cookies = initial_response.topbar.desktopTopbarRenderer.interstitial?.consentBumpV2Renderer.agreeButton.buttonRenderer.command.saveConsentAction;
      if (cookies) {
        Object.assign(cookieJar, {
          VISITOR_INFO1_LIVE: cookies.visitorCookie,
          CONSENT: cookies.consentCookie
        });
      }
      const updatedValues = await acceptViewerDiscretion(vid.videoId, cookieJar, body, true);
      player_response.streamingData = updatedValues.streamingData;
      initial_response.contents.twoColumnWatchNextResults.secondaryResults = updatedValues.relatedVideos;
    } else if (player_response.playabilityStatus.status === "LIVE_STREAM_OFFLINE")
      upcoming = true;
    else
      throw new Error(`While getting info from url
${player_response.playabilityStatus.errorScreen.playerErrorMessageRenderer?.reason.simpleText ?? player_response.playabilityStatus.errorScreen.playerKavRenderer?.reason.simpleText ?? player_response.playabilityStatus.reason}`);
  }
  const ownerInfo = initial_response.contents.twoColumnWatchNextResults.results?.results?.contents[1]?.videoSecondaryInfoRenderer?.owner?.videoOwnerRenderer;
  const badge = ownerInfo?.badges?.[0]?.metadataBadgeRenderer?.style?.toLowerCase();
  const html5player = `https://www.youtube.com${body.split('"jsUrl":"')[1].split('"')[0]}`;
  const related = [];
  initial_response.contents.twoColumnWatchNextResults.secondaryResults.secondaryResults.results.forEach((res) => {
    if (res.compactVideoRenderer)
      related.push(`https://www.youtube.com/watch?v=${res.compactVideoRenderer.videoId}`);
    if (res.itemSectionRenderer?.contents)
      res.itemSectionRenderer.contents.forEach((x) => {
        if (x.compactVideoRenderer)
          related.push(`https://www.youtube.com/watch?v=${x.compactVideoRenderer.videoId}`);
      });
  });
  const microformat = player_response.microformat.playerMicroformatRenderer;
  const musicInfo = initial_response.engagementPanels.find((item) => item?.engagementPanelSectionListRenderer?.panelIdentifier == "engagement-panel-structured-description")?.engagementPanelSectionListRenderer.content.structuredDescriptionContentRenderer.items.find((el) => el.videoDescriptionMusicSectionRenderer)?.videoDescriptionMusicSectionRenderer.carouselLockups;
  const music = [];
  if (musicInfo) {
    musicInfo.forEach((x) => {
      if (!x.carouselLockupRenderer)
        return;
      const row = x.carouselLockupRenderer;
      const song = row.videoLockup?.compactVideoRenderer.title.simpleText ?? row.videoLockup?.compactVideoRenderer.title.runs?.find((x2) => x2.text)?.text;
      const metadata = row.infoRows?.map((info) => [info.infoRowRenderer.title.simpleText.toLowerCase(), (info.infoRowRenderer.expandedMetadata ?? info.infoRowRenderer.defaultMetadata)?.runs?.map((i) => i.text).join("") ?? info.infoRowRenderer.defaultMetadata?.simpleText ?? info.infoRowRenderer.expandedMetadata?.simpleText ?? ""]);
      const contents = Object.fromEntries(metadata ?? {});
      const id = row.videoLockup?.compactVideoRenderer.navigationEndpoint?.watchEndpoint.videoId ?? row.infoRows?.find((x2) => x2.infoRowRenderer.title.simpleText.toLowerCase() == "song")?.infoRowRenderer.defaultMetadata.runs?.find((x2) => x2.navigationEndpoint)?.navigationEndpoint.watchEndpoint?.videoId;
      music.push({ song, url: id ? `https://www.youtube.com/watch?v=${id}` : null, ...contents });
    });
  }
  const rawChapters = initial_response.playerOverlays.playerOverlayRenderer.decoratedPlayerBarRenderer?.decoratedPlayerBarRenderer.playerBar?.multiMarkersPlayerBarRenderer.markersMap?.find((m) => m.key === "DESCRIPTION_CHAPTERS")?.value?.chapters;
  const chapters = [];
  if (rawChapters) {
    for (const { chapterRenderer } of rawChapters) {
      chapters.push({
        title: chapterRenderer.title.simpleText,
        timestamp: parseSeconds(chapterRenderer.timeRangeStartMillis / 1e3),
        seconds: chapterRenderer.timeRangeStartMillis / 1e3,
        thumbnails: chapterRenderer.thumbnail.thumbnails
      });
    }
  }
  let upcomingDate;
  if (upcoming) {
    if (microformat.liveBroadcastDetails.startTimestamp)
      upcomingDate = new Date(microformat.liveBroadcastDetails.startTimestamp);
    else {
      const timestamp = player_response.playabilityStatus.liveStreamability.liveStreamabilityRenderer.offlineSlate.liveStreamOfflineSlateRenderer.scheduledStartTime;
      upcomingDate = new Date(parseInt(timestamp) * 1e3);
    }
  }
  const likeRenderer = initial_response.contents.twoColumnWatchNextResults.results.results.contents.find((content) => content.videoPrimaryInfoRenderer)?.videoPrimaryInfoRenderer.videoActions.menuRenderer.topLevelButtons?.find((button) => button.toggleButtonRenderer?.defaultIcon.iconType === "LIKE" || button.segmentedLikeDislikeButtonRenderer?.likeButton.toggleButtonRenderer?.defaultIcon.iconType === "LIKE");
  const video_details = new YouTubeVideo({
    id: vid.videoId,
    title: vid.title,
    description: vid.shortDescription,
    duration: Number(vid.lengthSeconds),
    duration_raw: parseSeconds(vid.lengthSeconds),
    uploadedAt: microformat.publishDate,
    liveAt: microformat.liveBroadcastDetails?.startTimestamp,
    upcoming: upcomingDate,
    thumbnails: vid.thumbnail.thumbnails,
    channel: {
      name: vid.author,
      id: vid.channelId,
      url: `https://www.youtube.com/channel/${vid.channelId}`,
      verified: Boolean(badge?.includes("verified")),
      artist: Boolean(badge?.includes("artist")),
      icons: ownerInfo?.thumbnail?.thumbnails || void 0
    },
    views: vid.viewCount,
    tags: vid.keywords,
    likes: parseInt(likeRenderer?.toggleButtonRenderer?.defaultText.accessibility?.accessibilityData.label.replace(/\D+/g, "") ?? likeRenderer?.segmentedLikeDislikeButtonRenderer?.likeButton.toggleButtonRenderer?.defaultText.accessibility?.accessibilityData.label.replace(/\D+/g, "") ?? 0),
    live: vid.isLiveContent,
    private: vid.isPrivate,
    discretionAdvised,
    music,
    chapters
  });
  let format = [];
  if (!upcoming) {
    format.push(...player_response.streamingData.formats ?? []);
    format.push(...player_response.streamingData.adaptiveFormats ?? []);
    if (parseAudioFormats(format).length === 0 && !options.htmldata) {
      format = await getAndroidFormats(vid.videoId, cookieJar, body);
    }
  }
  const LiveStreamData = {
    isLive: video_details.live,
    dashManifestUrl: player_response.streamingData?.dashManifestUrl ?? null,
    hlsManifestUrl: player_response.streamingData?.hlsManifestUrl ?? null
  };
  return {
    LiveStreamData,
    html5player,
    format,
    video_details,
    related_videos: related
  };
}
async function video_stream_info(url, options = {}) {
  if (typeof url !== "string")
    throw new Error("url parameter is not a URL string or a string of HTML");
  let body;
  const cookieJar = {};
  if (options.htmldata) {
    body = url;
  } else {
    const video_id = extractVideoId(url);
    if (!video_id)
      throw new Error("This is not a YouTube Watch URL");
    const new_url = `https://www.youtube.com/watch?v=${video_id}&has_verified=1`;
    body = await request(new_url, {
      headers: { "accept-language": "en-US,en;q=0.9" },
      cookies: true,
      cookieJar
    });
  }
  if (body.indexOf("Our systems have detected unusual traffic from your computer network.") !== -1)
    throw new Error("Captcha page: YouTube has detected that you are a bot!");
  const player_data = body.split("var ytInitialPlayerResponse = ")?.[1]?.split(";<\/script>")[0].split(/(?<=}}});\s*(var|const|let)\s/)[0];
  if (!player_data)
    throw new Error("Initial Player Response Data is undefined.");
  const player_response = JSON.parse(player_data);
  let upcoming = false;
  if (player_response.playabilityStatus.status !== "OK") {
    if (player_response.playabilityStatus.status === "CONTENT_CHECK_REQUIRED") {
      if (options.htmldata)
        throw new Error(`Accepting the viewer discretion is not supported when using htmldata, video: ${player_response.videoDetails.videoId}`);
      const initial_data = body.split("var ytInitialData = ")?.[1]?.split(";<\/script>")[0].split(/;\s*(var|const|let)\s/)[0];
      if (!initial_data)
        throw new Error("Initial Response Data is undefined.");
      const cookies = JSON.parse(initial_data).topbar.desktopTopbarRenderer.interstitial?.consentBumpV2Renderer.agreeButton.buttonRenderer.command.saveConsentAction;
      if (cookies) {
        Object.assign(cookieJar, {
          VISITOR_INFO1_LIVE: cookies.visitorCookie,
          CONSENT: cookies.consentCookie
        });
      }
      const updatedValues = await acceptViewerDiscretion(player_response.videoDetails.videoId, cookieJar, body, false);
      player_response.streamingData = updatedValues.streamingData;
    } else if (player_response.playabilityStatus.status === "LIVE_STREAM_OFFLINE")
      upcoming = true;
    else
      throw new Error(`While getting info from url
${player_response.playabilityStatus.errorScreen.playerErrorMessageRenderer?.reason.simpleText ?? player_response.playabilityStatus.errorScreen.playerKavRenderer?.reason.simpleText ?? player_response.playabilityStatus.reason}`);
  }
  const html5player = `https://www.youtube.com${body.split('"jsUrl":"')[1].split('"')[0]}`;
  const duration = Number(player_response.videoDetails.lengthSeconds);
  const video_details = {
    url: `https://www.youtube.com/watch?v=${player_response.videoDetails.videoId}`,
    durationInSec: (duration < 0 ? 0 : duration) || 0
  };
  let format = [];
  if (!upcoming) {
    format.push(...player_response.streamingData.formats ?? []);
    format.push(...player_response.streamingData.adaptiveFormats ?? []);
    if (parseAudioFormats(format).length === 0 && !options.htmldata) {
      format = await getAndroidFormats(player_response.videoDetails.videoId, cookieJar, body);
    }
  }
  const LiveStreamData = {
    isLive: player_response.videoDetails.isLiveContent,
    dashManifestUrl: player_response.streamingData?.dashManifestUrl ?? null,
    hlsManifestUrl: player_response.streamingData?.hlsManifestUrl ?? null
  };
  return await decipher_info({
    LiveStreamData,
    html5player,
    format,
    video_details
  }, true);
}
function parseSeconds(seconds) {
  const d = Number(seconds);
  const h = Math.floor(d / 3600);
  const m = Math.floor(d % 3600 / 60);
  const s = Math.floor(d % 3600 % 60);
  const hDisplay = h > 0 ? (h < 10 ? `0${h}` : h) + ":" : "";
  const mDisplay = m > 0 ? (m < 10 ? `0${m}` : m) + ":" : "00:";
  const sDisplay = s > 0 ? s < 10 ? `0${s}` : s : "00";
  return hDisplay + mDisplay + sDisplay;
}
async function video_info(url, options = {}) {
  const data = await video_basic_info(url.trim(), options);
  return await decipher_info(data);
}
async function decipher_info(data, audio_only = false) {
  if (data.LiveStreamData.isLive === true && data.LiveStreamData.dashManifestUrl !== null && data.video_details.durationInSec === 0) {
    return data;
  } else if (data.format.length > 0 && (data.format[0].signatureCipher || data.format[0].cipher)) {
    if (audio_only)
      data.format = parseAudioFormats(data.format);
    data.format = await format_decipher(data.format, data.html5player);
    return data;
  } else
    return data;
}
async function playlist_info(url, options = {}) {
  if (!url || typeof url !== "string")
    throw new Error(`Expected playlist url, received ${typeof url}!`);
  let url_ = url.trim();
  if (!url_.startsWith("https"))
    url_ = `https://www.youtube.com/playlist?list=${url_}`;
  if (url_.indexOf("list=") === -1)
    throw new Error("This is not a Playlist URL");
  if (url_.includes("music.youtube.com")) {
    const urlObj = new import_node_url3.URL(url_);
    urlObj.hostname = "www.youtube.com";
    url_ = urlObj.toString();
  }
  const body = await request(url_, {
    headers: {
      "accept-language": options.language || "en-US;q=0.9"
    }
  });
  if (body.indexOf("Our systems have detected unusual traffic from your computer network.") !== -1)
    throw new Error("Captcha page: YouTube has detected that you are a bot!");
  const response = JSON.parse(body.split("var ytInitialData = ")[1].split(";<\/script>")[0].split(/;\s*(var|const|let)\s/)[0]);
  if (response.alerts) {
    if (response.alerts[0].alertWithButtonRenderer?.type === "INFO") {
      if (!options.incomplete)
        throw new Error(`While parsing playlist url
${response.alerts[0].alertWithButtonRenderer.text.simpleText}`);
    } else if (response.alerts[0].alertRenderer?.type === "ERROR")
      throw new Error(`While parsing playlist url
${response.alerts[0].alertRenderer.text.runs[0].text}`);
    else
      throw new Error("While parsing playlist url\nUnknown Playlist Error");
  }
  if (response.currentVideoEndpoint) {
    return getWatchPlaylist(response, body, url_);
  } else
    return getNormalPlaylist(response, body);
}
function getPlaylistVideos(data, limit = Infinity) {
  const videos = [];
  for (let i = 0; i < data.length; i++) {
    if (limit === videos.length)
      break;
    const info = data[i].playlistVideoRenderer;
    if (!info || !info.shortBylineText)
      continue;
    videos.push(new YouTubeVideo({
      id: info.videoId,
      duration: parseInt(info.lengthSeconds) || 0,
      duration_raw: info.lengthText?.simpleText ?? "0:00",
      thumbnails: info.thumbnail.thumbnails,
      title: info.title.runs[0].text,
      upcoming: info.upcomingEventData?.startTime ? new Date(parseInt(info.upcomingEventData.startTime) * 1e3) : void 0,
      channel: {
        id: info.shortBylineText.runs[0].navigationEndpoint.browseEndpoint.browseId || void 0,
        name: info.shortBylineText.runs[0].text || void 0,
        url: `https://www.youtube.com${info.shortBylineText.runs[0].navigationEndpoint.browseEndpoint.canonicalBaseUrl || info.shortBylineText.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        icon: void 0
      }
    }));
  }
  return videos;
}
function getContinuationToken(data) {
  return data.find((x) => Object.keys(x)[0] === "continuationItemRenderer")?.continuationItemRenderer.continuationEndpoint?.continuationCommand?.token;
}
async function acceptViewerDiscretion(videoId, cookieJar, body, extractRelated) {
  const apiKey = body.split('INNERTUBE_API_KEY":"')[1]?.split('"')[0] ?? body.split('innertubeApiKey":"')[1]?.split('"')[0] ?? DEFAULT_API_KEY;
  const sessionToken = body.split('"XSRF_TOKEN":"')[1]?.split('"')[0].replaceAll("\\u003d", "=") ?? body.split('"xsrf_token":"')[1]?.split('"')[0].replaceAll("\\u003d", "=");
  if (!sessionToken)
    throw new Error(`Unable to extract XSRF_TOKEN to accept the viewer discretion popup for video: ${videoId}.`);
  const verificationResponse = await request(`https://www.youtube.com/youtubei/v1/verify_age?key=${apiKey}&prettyPrint=false`, {
    method: "POST",
    body: JSON.stringify({
      context: {
        client: {
          utcOffsetMinutes: 0,
          gl: "US",
          hl: "en",
          clientName: "WEB",
          clientVersion: body.split('"INNERTUBE_CONTEXT_CLIENT_VERSION":"')[1]?.split('"')[0] ?? body.split('"innertube_context_client_version":"')[1]?.split('"')[0] ?? "<some version>"
        },
        user: {},
        request: {}
      },
      nextEndpoint: {
        urlEndpoint: {
          url: `/watch?v=${videoId}&has_verified=1`
        }
      },
      setControvercy: true
    }),
    cookies: true,
    cookieJar
  });
  const endpoint = JSON.parse(verificationResponse).actions[0].navigateAction.endpoint;
  const videoPage = await request(`https://www.youtube.com/${endpoint.urlEndpoint.url}&pbj=1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new import_node_url3.URLSearchParams([
      ["command", JSON.stringify(endpoint)],
      ["session_token", sessionToken]
    ]).toString(),
    cookies: true,
    cookieJar
  });
  if (videoPage.includes("<h1>Something went wrong</h1>"))
    throw new Error(`Unable to accept the viewer discretion popup for video: ${videoId}`);
  const videoPageData = JSON.parse(videoPage);
  if (videoPageData[2].playerResponse.playabilityStatus.status !== "OK")
    throw new Error(`While getting info from url after trying to accept the discretion popup for video ${videoId}
${videoPageData[2].playerResponse.playabilityStatus.errorScreen.playerErrorMessageRenderer?.reason.simpleText ?? videoPageData[2].playerResponse.playabilityStatus.errorScreen.playerKavRenderer?.reason.simpleText}`);
  const streamingData = videoPageData[2].playerResponse.streamingData;
  if (extractRelated)
    return {
      streamingData,
      relatedVideos: videoPageData[3].response.contents.twoColumnWatchNextResults.secondaryResults
    };
  return { streamingData };
}
async function getAndroidFormats(videoId, cookieJar, body) {
  const apiKey = body.split('INNERTUBE_API_KEY":"')[1]?.split('"')[0] ?? body.split('innertubeApiKey":"')[1]?.split('"')[0] ?? DEFAULT_API_KEY;
  const response = await request(`https://www.youtube.com/youtubei/v1/player?key=${apiKey}&prettyPrint=false`, {
    method: "POST",
    body: JSON.stringify({
      context: {
        client: {
          clientName: "ANDROID",
          clientVersion: "16.49",
          hl: "en",
          timeZone: "UTC",
          utcOffsetMinutes: 0
        }
      },
      videoId,
      playbackContext: { contentPlaybackContext: { html5Preference: "HTML5_PREF_WANTS" } },
      contentCheckOk: true,
      racyCheckOk: true
    }),
    cookies: true,
    cookieJar
  });
  return JSON.parse(response).streamingData.formats;
}
function getWatchPlaylist(response, body, url) {
  const playlist_details = response.contents.twoColumnWatchNextResults.playlist?.playlist;
  if (!playlist_details)
    throw new Error("Watch playlist unavailable due to YouTube layout changes.");
  const videos = getWatchPlaylistVideos(playlist_details.contents);
  const API_KEY = body.split('INNERTUBE_API_KEY":"')[1]?.split('"')[0] ?? body.split('innertubeApiKey":"')[1]?.split('"')[0] ?? DEFAULT_API_KEY;
  const videoCount = playlist_details.totalVideos;
  const channel = playlist_details.shortBylineText?.runs?.[0];
  const badge = playlist_details.badges?.[0]?.metadataBadgeRenderer?.style.toLowerCase();
  return new YouTubePlayList({
    continuation: {
      api: API_KEY,
      token: getContinuationToken(playlist_details.contents),
      clientVersion: body.split('"INNERTUBE_CONTEXT_CLIENT_VERSION":"')[1]?.split('"')[0] ?? body.split('"innertube_context_client_version":"')[1]?.split('"')[0] ?? "<some version>"
    },
    id: playlist_details.playlistId || "",
    title: playlist_details.title || "",
    videoCount: parseInt(videoCount) || 0,
    videos,
    url,
    channel: {
      id: channel?.navigationEndpoint?.browseEndpoint?.browseId || null,
      name: channel?.text || null,
      url: `https://www.youtube.com${channel?.navigationEndpoint?.browseEndpoint?.canonicalBaseUrl || channel?.navigationEndpoint?.commandMetadata?.webCommandMetadata?.url}`,
      verified: Boolean(badge?.includes("verified")),
      artist: Boolean(badge?.includes("artist"))
    }
  });
}
function getNormalPlaylist(response, body) {
  const json_data = response.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].itemSectionRenderer.contents[0].playlistVideoListRenderer.contents;
  const playlist_details = response.sidebar.playlistSidebarRenderer.items;
  const API_KEY = body.split('INNERTUBE_API_KEY":"')[1]?.split('"')[0] ?? body.split('innertubeApiKey":"')[1]?.split('"')[0] ?? DEFAULT_API_KEY;
  const videos = getPlaylistVideos(json_data, 100);
  const data = playlist_details[0].playlistSidebarPrimaryInfoRenderer;
  if (!data.title.runs || !data.title.runs.length)
    throw new Error("Failed to Parse Playlist info.");
  const author = playlist_details[1]?.playlistSidebarSecondaryInfoRenderer.videoOwner;
  const views = data.stats.length === 3 ? data.stats[1].simpleText.replace(/\D/g, "") : 0;
  const lastUpdate = data.stats.find((x) => "runs" in x && x["runs"].find((y) => y.text.toLowerCase().includes("last update")))?.runs.pop()?.text ?? null;
  const videosCount = data.stats[0].runs[0].text.replace(/\D/g, "") || 0;
  const res = new YouTubePlayList({
    continuation: {
      api: API_KEY,
      token: getContinuationToken(json_data),
      clientVersion: body.split('"INNERTUBE_CONTEXT_CLIENT_VERSION":"')[1]?.split('"')[0] ?? body.split('"innertube_context_client_version":"')[1]?.split('"')[0] ?? "<some version>"
    },
    id: data.title.runs[0].navigationEndpoint.watchEndpoint.playlistId,
    title: data.title.runs[0].text,
    videoCount: parseInt(videosCount) || 0,
    lastUpdate,
    views: parseInt(views) || 0,
    videos,
    url: `https://www.youtube.com/playlist?list=${data.title.runs[0].navigationEndpoint.watchEndpoint.playlistId}`,
    link: `https://www.youtube.com${data.title.runs[0].navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
    channel: author ? {
      name: author.videoOwnerRenderer.title.runs[0].text,
      id: author.videoOwnerRenderer.title.runs[0].navigationEndpoint.browseEndpoint.browseId,
      url: `https://www.youtube.com${author.videoOwnerRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url || author.videoOwnerRenderer.navigationEndpoint.browseEndpoint.canonicalBaseUrl}`,
      icons: author.videoOwnerRenderer.thumbnail.thumbnails ?? []
    } : {},
    thumbnail: data.thumbnailRenderer.playlistVideoThumbnailRenderer?.thumbnail.thumbnails.length ? data.thumbnailRenderer.playlistVideoThumbnailRenderer.thumbnail.thumbnails[data.thumbnailRenderer.playlistVideoThumbnailRenderer.thumbnail.thumbnails.length - 1] : null
  });
  return res;
}
function getWatchPlaylistVideos(data, limit = Infinity) {
  const videos = [];
  for (let i = 0; i < data.length; i++) {
    if (limit === videos.length)
      break;
    const info = data[i].playlistPanelVideoRenderer;
    if (!info || !info.shortBylineText)
      continue;
    const channel_info = info.shortBylineText.runs[0];
    videos.push(new YouTubeVideo({
      id: info.videoId,
      duration: parseDuration(info.lengthText?.simpleText) || 0,
      duration_raw: info.lengthText?.simpleText ?? "0:00",
      thumbnails: info.thumbnail.thumbnails,
      title: info.title.simpleText,
      upcoming: info.thumbnailOverlays[0].thumbnailOverlayTimeStatusRenderer?.style === "UPCOMING" || void 0,
      channel: {
        id: channel_info.navigationEndpoint.browseEndpoint.browseId || void 0,
        name: channel_info.text || void 0,
        url: `https://www.youtube.com${channel_info.navigationEndpoint.browseEndpoint.canonicalBaseUrl || channel_info.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
        icon: void 0
      }
    }));
  }
  return videos;
}
function parseDuration(text) {
  if (!text)
    return 0;
  const split = text.split(":");
  switch (split.length) {
    case 2:
      return parseInt(split[0]) * 60 + parseInt(split[1]);
    case 3:
      return parseInt(split[0]) * 60 * 60 + parseInt(split[1]) * 60 + parseInt(split[2]);
    default:
      return 0;
  }
}

// play-dl/YouTube/classes/LiveStream.ts
var import_node_url4 = require("url");
var LiveStream = class {
  stream;
  type;
  request;
  normal_timer;
  dash_timer;
  dash_url;
  base_url;
  interval;
  video_url;
  precache;
  sequence;
  constructor(dash_url, interval, video_url, precache) {
    this.stream = new import_node_stream.Readable({ highWaterMark: 5 * 1e3 * 1e3, read() {
    } });
    this.type = "arbitrary" /* Arbitrary */;
    this.sequence = 0;
    this.dash_url = dash_url;
    this.base_url = "";
    this.interval = interval;
    this.video_url = video_url;
    this.precache = precache || 3;
    this.dash_timer = new Timer(() => {
      this.dash_updater();
      this.dash_timer.reuse();
    }, 1800);
    this.stream.on("close", () => {
      this.cleanup();
    });
    this.initialize_dash();
  }
  cleanup() {
    this.normal_timer?.destroy();
    this.dash_timer.destroy();
    this.request?.destroy();
    this.video_url = "";
    this.request = void 0;
    this.dash_url = "";
    this.base_url = "";
    this.interval = 0;
  }
  async dash_updater() {
    const info = await video_stream_info(this.video_url);
    if (info.LiveStreamData.dashManifestUrl)
      this.dash_url = info.LiveStreamData.dashManifestUrl;
    return this.initialize_dash();
  }
  async initialize_dash() {
    const response = await request(this.dash_url);
    const audioFormat = response.split('<AdaptationSet id="0"')[1].split("</AdaptationSet>")[0].split("</Representation>");
    if (audioFormat[audioFormat.length - 1] === "")
      audioFormat.pop();
    this.base_url = audioFormat[audioFormat.length - 1].split("<BaseURL>")[1].split("</BaseURL>")[0];
    await request_stream(`https://${new import_node_url4.URL(this.base_url).host}/generate_204`);
    if (this.sequence === 0) {
      const list = audioFormat[audioFormat.length - 1].split("<SegmentList>")[1].split("</SegmentList>")[0].replaceAll('<SegmentURL media="', "").split('"/>');
      if (list[list.length - 1] === "")
        list.pop();
      if (list.length > this.precache)
        list.splice(0, list.length - this.precache);
      this.sequence = Number(list[0].split("sq/")[1].split("/")[0]);
      this.first_data(list.length);
    }
  }
  async first_data(len) {
    for (let i = 1; i <= len; i++) {
      await new Promise(async (resolve) => {
        const stream4 = await request_stream(this.base_url + "sq/" + this.sequence).catch((err) => err);
        if (stream4 instanceof Error) {
          this.stream.emit("error", stream4);
          return;
        }
        this.request = stream4;
        stream4.on("data", (c) => {
          this.stream.push(c);
        });
        stream4.on("end", () => {
          this.sequence++;
          resolve("");
        });
        stream4.once("error", (err) => {
          this.stream.emit("error", err);
        });
      });
    }
    this.normal_timer = new Timer(() => {
      this.loop();
      this.normal_timer?.reuse();
    }, this.interval);
  }
  loop() {
    return new Promise(async (resolve) => {
      const stream4 = await request_stream(this.base_url + "sq/" + this.sequence).catch((err) => err);
      if (stream4 instanceof Error) {
        this.stream.emit("error", stream4);
        return;
      }
      this.request = stream4;
      stream4.on("data", (c) => {
        this.stream.push(c);
      });
      stream4.on("end", () => {
        this.sequence++;
        resolve("");
      });
      stream4.once("error", (err) => {
        this.stream.emit("error", err);
      });
    });
  }
  pause() {
  }
  resume() {
  }
};
var Stream = class {
  stream;
  type;
  url;
  bytes_count;
  per_sec_bytes;
  content_length;
  video_url;
  timer;
  quality;
  request;
  constructor(url, type, duration, contentLength, video_url, options) {
    this.stream = new import_node_stream.Readable({ highWaterMark: 5 * 1e3 * 1e3, read() {
    } });
    this.url = url;
    this.quality = options.quality;
    this.type = type;
    this.bytes_count = 0;
    this.video_url = video_url;
    this.per_sec_bytes = Math.ceil(contentLength / duration);
    this.content_length = contentLength;
    this.request = null;
    this.timer = new Timer(() => {
      this.timer.reuse();
      this.loop();
    }, 265);
    this.stream.on("close", () => {
      this.timer.destroy();
      this.cleanup();
    });
    this.loop();
  }
  async retry() {
    const info = await video_stream_info(this.video_url);
    const audioFormat = parseAudioFormats(info.format);
    this.url = audioFormat[this.quality].url;
  }
  cleanup() {
    this.request?.destroy();
    this.request = null;
    this.url = "";
  }
  async loop() {
    if (this.stream.destroyed) {
      this.timer.destroy();
      this.cleanup();
      return;
    }
    const end = this.bytes_count + this.per_sec_bytes * 300;
    const stream4 = await request_stream(this.url, {
      headers: {
        range: `bytes=${this.bytes_count}-${end >= this.content_length ? "" : end}`
      }
    }).catch((err) => err);
    if (stream4 instanceof Error) {
      this.stream.emit("error", stream4);
      this.bytes_count = 0;
      this.per_sec_bytes = 0;
      this.cleanup();
      return;
    }
    if (Number(stream4.statusCode) >= 400) {
      this.cleanup();
      await this.retry();
      this.timer.reuse();
      this.loop();
      return;
    }
    this.request = stream4;
    stream4.on("data", (c) => {
      this.stream.push(c);
    });
    stream4.once("error", async () => {
      this.cleanup();
      await this.retry();
      this.timer.reuse();
      this.loop();
    });
    stream4.on("data", (chunk) => {
      this.bytes_count += chunk.length;
    });
    stream4.on("end", () => {
      if (end >= this.content_length) {
        this.timer.destroy();
        this.stream.push(null);
        this.cleanup();
      }
    });
  }
  pause() {
    this.timer.pause();
  }
  resume() {
    this.timer.resume();
  }
};
var Timer = class {
  destroyed;
  paused;
  timer;
  callback;
  time_start;
  time_left;
  time_total;
  constructor(callback, time) {
    this.callback = callback;
    this.time_total = time;
    this.time_left = time;
    this.paused = false;
    this.destroyed = false;
    this.time_start = process.hrtime()[0];
    this.timer = setTimeout(this.callback, this.time_total * 1e3);
  }
  pause() {
    if (!this.paused && !this.destroyed) {
      this.paused = true;
      clearTimeout(this.timer);
      this.time_left = this.time_left - (process.hrtime()[0] - this.time_start);
      return true;
    } else
      return false;
  }
  resume() {
    if (this.paused && !this.destroyed) {
      this.paused = false;
      this.time_start = process.hrtime()[0];
      this.timer = setTimeout(this.callback, this.time_left * 1e3);
      return true;
    } else
      return false;
  }
  reuse() {
    if (!this.destroyed) {
      clearTimeout(this.timer);
      this.time_left = this.time_total;
      this.paused = false;
      this.time_start = process.hrtime()[0];
      this.timer = setTimeout(this.callback, this.time_total * 1e3);
      return true;
    } else
      return false;
  }
  destroy() {
    clearTimeout(this.timer);
    this.destroyed = true;
    this.callback = () => {
    };
    this.time_total = 0;
    this.time_left = 0;
    this.paused = false;
    this.time_start = 0;
  }
};

// play-dl/YouTube/classes/WebmSeeker.ts
var import_play_audio = require("play-audio");
var import_node_stream2 = require("stream");
var WEB_ELEMENT_KEYS = Object.keys(import_play_audio.WebmElements);
var WebmSeeker = class extends import_node_stream2.Duplex {
  remaining;
  state;
  chunk;
  cursor;
  header;
  headfound;
  headerparsed;
  seekfound;
  data_size;
  offset;
  data_length;
  sec;
  time;
  constructor(sec, options) {
    super(options);
    this.state = "READING_HEAD" /* READING_HEAD */;
    this.cursor = 0;
    this.header = new import_play_audio.WebmHeader();
    this.headfound = false;
    this.headerparsed = false;
    this.seekfound = false;
    this.data_length = 0;
    this.data_size = 0;
    this.offset = 0;
    this.sec = sec;
    this.time = Math.floor(sec / 10) * 10;
  }
  get vint_length() {
    let i = 0;
    for (; i < 8; i++) {
      if (1 << 7 - i & this.chunk[this.cursor])
        break;
    }
    return ++i;
  }
  vint_value() {
    if (!this.chunk)
      return false;
    const length = this.vint_length;
    if (this.chunk.length < this.cursor + length)
      return false;
    let value = this.chunk[this.cursor] & (1 << 8 - length) - 1;
    for (let i = this.cursor + 1; i < this.cursor + length; i++)
      value = (value << 8) + this.chunk[i];
    this.data_size = length;
    this.data_length = value;
    return true;
  }
  cleanup() {
    this.cursor = 0;
    this.chunk = void 0;
    this.remaining = void 0;
  }
  _read() {
  }
  seek(content_length) {
    let clusterlength = 0, position = 0;
    let time_left = (this.sec - this.time) * 1e3 || 0;
    time_left = Math.round(time_left / 20) * 20;
    if (!this.header.segment.cues)
      return new Error("Failed to Parse Cues");
    for (let i = 0; i < this.header.segment.cues.length; i++) {
      const data = this.header.segment.cues[i];
      if (Math.floor(data.time / 1e3) === this.time) {
        position = data.position;
        clusterlength = (this.header.segment.cues[i + 1]?.position || content_length) - position - 1;
        break;
      } else
        continue;
    }
    if (clusterlength === 0)
      return position;
    return this.offset + Math.round(position + time_left / 20 * (clusterlength / 500));
  }
  _write(chunk, _, callback) {
    if (this.remaining) {
      this.chunk = Buffer.concat([this.remaining, chunk]);
      this.remaining = void 0;
    } else
      this.chunk = chunk;
    let err;
    if (this.state === "READING_HEAD" /* READING_HEAD */)
      err = this.readHead();
    else if (!this.seekfound)
      err = this.getClosestBlock();
    else
      err = this.readTag();
    if (err)
      callback(err);
    else
      callback();
  }
  readHead() {
    if (!this.chunk)
      return new Error("Chunk is missing");
    while (this.chunk.length > this.cursor) {
      const oldCursor = this.cursor;
      const id = this.vint_length;
      if (this.chunk.length < this.cursor + id)
        break;
      const ebmlID = this.parseEbmlID(this.chunk.slice(this.cursor, this.cursor + id).toString("hex"));
      this.cursor += id;
      if (!this.vint_value()) {
        this.cursor = oldCursor;
        break;
      }
      if (!ebmlID) {
        this.cursor += this.data_size + this.data_length;
        continue;
      }
      if (!this.headfound) {
        if (ebmlID.name === "ebml")
          this.headfound = true;
        else
          return new Error("Failed to find EBML ID at start of stream.");
      }
      const data = this.chunk.slice(this.cursor + this.data_size, this.cursor + this.data_size + this.data_length);
      const parse = this.header.parse(ebmlID, data);
      if (parse instanceof Error)
        return parse;
      if (ebmlID.name === "seekHead")
        this.offset = oldCursor;
      if (ebmlID.name === "cueClusterPosition" && this.header.segment.cues.length > 2 && this.time === this.header.segment.cues.at(-2).time / 1e3)
        this.emit("headComplete");
      if (ebmlID.type === 0 /* master */) {
        this.cursor += this.data_size;
        continue;
      }
      if (this.chunk.length < this.cursor + this.data_size + this.data_length) {
        this.cursor = oldCursor;
        break;
      } else
        this.cursor += this.data_size + this.data_length;
    }
    this.remaining = this.chunk.slice(this.cursor);
    this.cursor = 0;
  }
  readTag() {
    if (!this.chunk)
      return new Error("Chunk is missing");
    while (this.chunk.length > this.cursor) {
      const oldCursor = this.cursor;
      const id = this.vint_length;
      if (this.chunk.length < this.cursor + id)
        break;
      const ebmlID = this.parseEbmlID(this.chunk.slice(this.cursor, this.cursor + id).toString("hex"));
      this.cursor += id;
      if (!this.vint_value()) {
        this.cursor = oldCursor;
        break;
      }
      if (!ebmlID) {
        this.cursor += this.data_size + this.data_length;
        continue;
      }
      const data = this.chunk.slice(this.cursor + this.data_size, this.cursor + this.data_size + this.data_length);
      const parse = this.header.parse(ebmlID, data);
      if (parse instanceof Error)
        return parse;
      if (ebmlID.type === 0 /* master */) {
        this.cursor += this.data_size;
        continue;
      }
      if (this.chunk.length < this.cursor + this.data_size + this.data_length) {
        this.cursor = oldCursor;
        break;
      } else
        this.cursor += this.data_size + this.data_length;
      if (ebmlID.name === "simpleBlock") {
        const track = this.header.segment.tracks[this.header.audioTrack];
        if (!track || track.trackType !== 2)
          return new Error("No audio Track in this webm file.");
        if ((data[0] & 15) === track.trackNumber)
          this.push(data.slice(4));
      }
    }
    this.remaining = this.chunk.slice(this.cursor);
    this.cursor = 0;
  }
  getClosestBlock() {
    if (this.sec === 0) {
      this.seekfound = true;
      return this.readTag();
    }
    if (!this.chunk)
      return new Error("Chunk is missing");
    this.cursor = 0;
    let positionFound = false;
    while (!positionFound && this.cursor < this.chunk.length) {
      this.cursor = this.chunk.indexOf("a3", this.cursor, "hex");
      if (this.cursor === -1)
        return new Error("Failed to find nearest Block.");
      this.cursor++;
      if (!this.vint_value())
        return new Error("Failed to find correct simpleBlock in first chunk");
      if (this.cursor + this.data_length + this.data_length > this.chunk.length)
        continue;
      const data = this.chunk.slice(this.cursor + this.data_size, this.cursor + this.data_size + this.data_length);
      const track = this.header.segment.tracks[this.header.audioTrack];
      if (!track || track.trackType !== 2)
        return new Error("No audio Track in this webm file.");
      if ((data[0] & 15) === track.trackNumber) {
        this.cursor += this.data_size + this.data_length;
        this.push(data.slice(4));
        positionFound = true;
      } else
        continue;
    }
    if (!positionFound)
      return new Error("Failed to find nearest correct simple Block.");
    this.seekfound = true;
    return this.readTag();
  }
  parseEbmlID(ebmlID) {
    if (WEB_ELEMENT_KEYS.includes(ebmlID))
      return import_play_audio.WebmElements[ebmlID];
    else
      return false;
  }
  _destroy(error, callback) {
    this.cleanup();
    callback(error);
  }
  _final(callback) {
    this.cleanup();
    callback();
  }
};

// play-dl/YouTube/classes/SeekStream.ts
var SeekStream = class {
  stream;
  type;
  url;
  bytes_count;
  per_sec_bytes;
  header_length;
  content_length;
  video_url;
  timer;
  quality;
  request;
  constructor(url, duration, headerLength, contentLength, bitrate, video_url, options) {
    this.stream = new WebmSeeker(options.seek, {
      highWaterMark: 5 * 1e3 * 1e3,
      readableObjectMode: true
    });
    this.url = url;
    this.quality = options.quality;
    this.type = "opus" /* Opus */;
    this.bytes_count = 0;
    this.video_url = video_url;
    this.per_sec_bytes = bitrate ? Math.ceil(bitrate / 8) : Math.ceil(contentLength / duration);
    this.header_length = headerLength;
    this.content_length = contentLength;
    this.request = null;
    this.timer = new Timer(() => {
      this.timer.reuse();
      this.loop();
    }, 265);
    this.stream.on("close", () => {
      this.timer.destroy();
      this.cleanup();
    });
    this.seek();
  }
  async seek() {
    const parse = await new Promise(async (res, rej) => {
      if (!this.stream.headerparsed) {
        const stream4 = await request_stream(this.url, {
          headers: {
            range: `bytes=0-${this.header_length}`
          }
        }).catch((err) => err);
        if (stream4 instanceof Error) {
          rej(stream4);
          return;
        }
        if (Number(stream4.statusCode) >= 400) {
          rej(400);
          return;
        }
        this.request = stream4;
        stream4.pipe(this.stream, { end: false });
        stream4.once("end", () => {
          this.stream.state = "READING_DATA" /* READING_DATA */;
          res("");
        });
        this.stream.once("headComplete", () => {
          stream4.unpipe(this.stream);
          stream4.destroy();
          this.stream.state = "READING_DATA" /* READING_DATA */;
          res("");
        });
      } else
        res("");
    }).catch((err) => err);
    if (parse instanceof Error) {
      this.stream.emit("error", parse);
      this.bytes_count = 0;
      this.per_sec_bytes = 0;
      this.cleanup();
      return;
    } else if (parse === 400) {
      await this.retry();
      this.timer.reuse();
      return this.seek();
    }
    const bytes = this.stream.seek(this.content_length);
    if (bytes instanceof Error) {
      this.stream.emit("error", bytes);
      this.bytes_count = 0;
      this.per_sec_bytes = 0;
      this.cleanup();
      return;
    }
    this.stream.seekfound = false;
    this.bytes_count = bytes;
    this.timer.reuse();
    this.loop();
  }
  async retry() {
    const info = await video_stream_info(this.video_url);
    const audioFormat = parseAudioFormats(info.format);
    this.url = audioFormat[this.quality].url;
  }
  cleanup() {
    this.request?.destroy();
    this.request = null;
    this.url = "";
  }
  async loop() {
    if (this.stream.destroyed) {
      this.timer.destroy();
      this.cleanup();
      return;
    }
    const end = this.bytes_count + this.per_sec_bytes * 300;
    const stream4 = await request_stream(this.url, {
      headers: {
        range: `bytes=${this.bytes_count}-${end >= this.content_length ? "" : end}`
      }
    }).catch((err) => err);
    if (stream4 instanceof Error) {
      this.stream.emit("error", stream4);
      this.bytes_count = 0;
      this.per_sec_bytes = 0;
      this.cleanup();
      return;
    }
    if (Number(stream4.statusCode) >= 400) {
      this.cleanup();
      await this.retry();
      this.timer.reuse();
      this.loop();
      return;
    }
    this.request = stream4;
    stream4.pipe(this.stream, { end: false });
    stream4.once("error", async () => {
      this.cleanup();
      await this.retry();
      this.timer.reuse();
      this.loop();
    });
    stream4.on("data", (chunk) => {
      this.bytes_count += chunk.length;
    });
    stream4.on("end", () => {
      if (end >= this.content_length) {
        this.timer.destroy();
        this.stream.end();
        this.cleanup();
      }
    });
  }
  pause() {
    this.timer.pause();
  }
  resume() {
    this.timer.resume();
  }
};

// play-dl/YouTube/stream.ts
var import_node_url5 = require("url");
function parseAudioFormats(formats) {
  const result = [];
  formats.forEach((format) => {
    const type = format.mimeType;
    if (type.startsWith("audio")) {
      format.codec = type.split('codecs="')[1].split('"')[0];
      format.container = type.split("audio/")[1].split(";")[0];
      result.push(format);
    }
  });
  return result;
}
async function stream(url, options = {}) {
  const info = await video_stream_info(url, { htmldata: options.htmldata, language: options.language });
  return await stream_from_info(info, options);
}
async function stream_from_info(info, options = {}) {
  if (info.format.length === 0)
    throw new Error("Upcoming and premiere videos that are not currently live cannot be streamed.");
  if (options.quality && !Number.isInteger(options.quality))
    throw new Error("Quality must be set to an integer.");
  const final = [];
  if (info.LiveStreamData.isLive === true && info.LiveStreamData.dashManifestUrl !== null && info.video_details.durationInSec === 0) {
    return new LiveStream(info.LiveStreamData.dashManifestUrl, info.format[info.format.length - 1].targetDurationSec, info.video_details.url, options.precache);
  }
  const audioFormat = parseAudioFormats(info.format);
  if (typeof options.quality !== "number")
    options.quality = audioFormat.length - 1;
  else if (options.quality <= 0)
    options.quality = 0;
  else if (options.quality >= audioFormat.length)
    options.quality = audioFormat.length - 1;
  if (audioFormat.length !== 0)
    final.push(audioFormat[options.quality]);
  else
    final.push(info.format[info.format.length - 1]);
  let type = final[0].codec === "opus" && final[0].container === "webm" ? "webm/opus" /* WebmOpus */ : "arbitrary" /* Arbitrary */;
  await request_stream(`https://${new import_node_url5.URL(final[0].url).host}/generate_204`);
  if (type === "webm/opus" /* WebmOpus */) {
    if (!options.discordPlayerCompatibility) {
      options.seek ??= 0;
      if (options.seek >= info.video_details.durationInSec || options.seek < 0)
        throw new Error(`Seeking beyond limit. [ 0 - ${info.video_details.durationInSec - 1}]`);
      return new SeekStream(final[0].url, info.video_details.durationInSec, final[0].indexRange.end, Number(final[0].contentLength), Number(final[0].bitrate), info.video_details.url, options);
    } else if (options.seek)
      throw new Error("Can not seek with discordPlayerCompatibility set to true.");
  }
  let contentLength;
  if (final[0].contentLength) {
    contentLength = Number(final[0].contentLength);
  } else {
    contentLength = await request_content_length(final[0].url);
  }
  return new Stream(final[0].url, type, info.video_details.durationInSec, contentLength, info.video_details.url, options);
}

// play-dl/YouTube/utils/parser.ts
var BLURRED_THUMBNAILS = [
  "-oaymwEpCOADEI4CSFryq4qpAxsIARUAAAAAGAElAADIQj0AgKJDeAHtAZmZGUI=",
  "-oaymwEiCOADEI4CSFXyq4qpAxQIARUAAIhCGAFwAcABBu0BmZkZQg==",
  "-oaymwEiCOgCEMoBSFXyq4qpAxQIARUAAIhCGAFwAcABBu0BZmbmQQ==",
  "-oaymwEiCNAFEJQDSFXyq4qpAxQIARUAAIhCGAFwAcABBu0BZmZmQg==",
  "-oaymwEdCNAFEJQDSFryq4qpAw8IARUAAIhCGAHtAWZmZkI=",
  "-oaymwEdCNACELwBSFryq4qpAw8IARUAAIhCGAHtAT0K10E="
];
function ParseSearchResult(html, options) {
  if (!html)
    throw new Error("Can't parse Search result without data");
  if (!options)
    options = { type: "video", limit: 0 };
  else if (!options.type)
    options.type = "video";
  const hasLimit = typeof options.limit === "number" && options.limit > 0;
  options.unblurNSFWThumbnails ??= false;
  const data = html.split("var ytInitialData = ")?.[1]?.split(";<\/script>")[0].split(/;\s*(var|const|let)\s/)[0];
  const json_data = JSON.parse(data);
  const results = [];
  const details = json_data.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents.flatMap((s) => s.itemSectionRenderer?.contents);
  for (const detail of details) {
    if (hasLimit && results.length === options.limit)
      break;
    if (!detail || !detail.videoRenderer && !detail.channelRenderer && !detail.playlistRenderer)
      continue;
    switch (options.type) {
      case "video": {
        const parsed = parseVideo(detail);
        if (parsed) {
          if (options.unblurNSFWThumbnails)
            parsed.thumbnails.forEach(unblurThumbnail);
          results.push(parsed);
        }
        break;
      }
      case "channel": {
        const parsed = parseChannel(detail);
        if (parsed)
          results.push(parsed);
        break;
      }
      case "playlist": {
        const parsed = parsePlaylist(detail);
        if (parsed) {
          if (options.unblurNSFWThumbnails && parsed.thumbnail)
            unblurThumbnail(parsed.thumbnail);
          results.push(parsed);
        }
        break;
      }
      default:
        throw new Error(`Unknown search type: ${options.type}`);
    }
  }
  return results;
}
function parseDuration2(duration) {
  if (!duration)
    return 0;
  const args = duration.split(":");
  let dur = 0;
  switch (args.length) {
    case 3:
      dur = parseInt(args[0]) * 60 * 60 + parseInt(args[1]) * 60 + parseInt(args[2]);
      break;
    case 2:
      dur = parseInt(args[0]) * 60 + parseInt(args[1]);
      break;
    default:
      dur = parseInt(args[0]);
  }
  return dur;
}
function parseChannel(data) {
  if (!data || !data.channelRenderer)
    throw new Error("Failed to Parse YouTube Channel");
  const badge = data.channelRenderer.ownerBadges?.[0]?.metadataBadgeRenderer?.style?.toLowerCase();
  const url = `https://www.youtube.com${data.channelRenderer.navigationEndpoint.browseEndpoint.canonicalBaseUrl || data.channelRenderer.navigationEndpoint.commandMetadata.webCommandMetadata.url}`;
  const thumbnail = data.channelRenderer.thumbnail.thumbnails[data.channelRenderer.thumbnail.thumbnails.length - 1];
  const res = new YouTubeChannel({
    id: data.channelRenderer.channelId,
    name: data.channelRenderer.title.simpleText,
    icon: {
      url: thumbnail.url.replace("//", "https://"),
      width: thumbnail.width,
      height: thumbnail.height
    },
    url,
    verified: Boolean(badge?.includes("verified")),
    artist: Boolean(badge?.includes("artist")),
    subscribers: data.channelRenderer.subscriberCountText?.simpleText ?? "0 subscribers"
  });
  return res;
}
function parseVideo(data) {
  if (!data || !data.videoRenderer)
    throw new Error("Failed to Parse YouTube Video");
  const channel = data.videoRenderer.ownerText.runs[0];
  const badge = data.videoRenderer.ownerBadges?.[0]?.metadataBadgeRenderer?.style?.toLowerCase();
  const durationText = data.videoRenderer.lengthText;
  const res = new YouTubeVideo({
    id: data.videoRenderer.videoId,
    url: `https://www.youtube.com/watch?v=${data.videoRenderer.videoId}`,
    title: data.videoRenderer.title.runs[0].text,
    description: data.videoRenderer.detailedMetadataSnippets?.[0].snippetText.runs?.length ? data.videoRenderer.detailedMetadataSnippets[0].snippetText.runs.map((run) => run.text).join("") : "",
    duration: durationText ? parseDuration2(durationText.simpleText) : 0,
    duration_raw: durationText ? durationText.simpleText : null,
    thumbnails: data.videoRenderer.thumbnail.thumbnails,
    channel: {
      id: channel.navigationEndpoint.browseEndpoint.browseId || null,
      name: channel.text || null,
      url: `https://www.youtube.com${channel.navigationEndpoint.browseEndpoint.canonicalBaseUrl || channel.navigationEndpoint.commandMetadata.webCommandMetadata.url}`,
      icons: data.videoRenderer.channelThumbnailSupportedRenderers.channelThumbnailWithLinkRenderer.thumbnail.thumbnails,
      verified: Boolean(badge?.includes("verified")),
      artist: Boolean(badge?.includes("artist"))
    },
    uploadedAt: data.videoRenderer.publishedTimeText?.simpleText ?? null,
    upcoming: data.videoRenderer.upcomingEventData?.startTime ? new Date(parseInt(data.videoRenderer.upcomingEventData.startTime) * 1e3) : void 0,
    views: data.videoRenderer.viewCountText?.simpleText?.replace(/\D/g, "") ?? 0,
    live: durationText ? false : true
  });
  return res;
}
function parsePlaylist(data) {
  if (!data || !data.playlistRenderer)
    throw new Error("Failed to Parse YouTube Playlist");
  const thumbnail = data.playlistRenderer.thumbnails[0].thumbnails[data.playlistRenderer.thumbnails[0].thumbnails.length - 1];
  const channel = data.playlistRenderer.shortBylineText.runs?.[0];
  const res = new YouTubePlayList({
    id: data.playlistRenderer.playlistId,
    title: data.playlistRenderer.title.simpleText,
    thumbnail: {
      id: data.playlistRenderer.playlistId,
      url: thumbnail.url,
      height: thumbnail.height,
      width: thumbnail.width
    },
    channel: {
      id: channel?.navigationEndpoint.browseEndpoint.browseId,
      name: channel?.text,
      url: `https://www.youtube.com${channel?.navigationEndpoint.commandMetadata.webCommandMetadata.url}`
    },
    videos: parseInt(data.playlistRenderer.videoCount.replace(/\D/g, ""))
  }, true);
  return res;
}
function unblurThumbnail(thumbnail) {
  if (BLURRED_THUMBNAILS.find((sqp) => thumbnail.url.includes(sqp))) {
    thumbnail.url = thumbnail.url.split("?")[0];
    switch (thumbnail.url.split("/").at(-1).split(".")[0]) {
      case "hq2":
      case "hqdefault":
        thumbnail.width = 480;
        thumbnail.height = 360;
        break;
      case "hq720":
        thumbnail.width = 1280;
        thumbnail.height = 720;
        break;
      case "sddefault":
        thumbnail.width = 640;
        thumbnail.height = 480;
        break;
      case "mqdefault":
        thumbnail.width = 320;
        thumbnail.height = 180;
        break;
      case "default":
        thumbnail.width = 120;
        thumbnail.height = 90;
        break;
      default:
        thumbnail.width = thumbnail.height = NaN;
    }
  }
}

// play-dl/YouTube/search.ts
async function yt_search(search2, options = {}) {
  let url = "https://www.youtube.com/results?search_query=" + search2;
  options.type ??= "video";
  if (url.indexOf("&sp=") === -1) {
    url += "&sp=";
    switch (options.type) {
      case "channel":
        url += "EgIQAg%253D%253D" /* Channel */;
        break;
      case "playlist":
        url += "EgIQAw%253D%253D" /* PlayList */;
        break;
      case "video":
        url += "EgIQAQ%253D%253D" /* Video */;
        break;
      default:
        throw new Error(`Unknown search type: ${options.type}`);
    }
  }
  const body = await request(url, {
    headers: {
      "accept-language": options.language || "en-US;q=0.9"
    }
  });
  if (body.indexOf("Our systems have detected unusual traffic from your computer network.") !== -1)
    throw new Error("Captcha page: YouTube has detected that you are a bot!");
  return ParseSearchResult(body, options);
}

// play-dl/Spotify/classes.ts
var SpotifyTrack = class {
  name;
  type;
  id;
  isrc;
  url;
  explicit;
  playable;
  durationInSec;
  durationInMs;
  artists;
  album;
  thumbnail;
  constructor(data) {
    this.name = data.name;
    this.id = data.id;
    this.isrc = data.external_ids?.isrc || "";
    this.type = "track";
    this.url = data.external_urls.spotify;
    this.explicit = data.explicit;
    this.playable = data.is_playable;
    this.durationInMs = data.duration_ms;
    this.durationInSec = Math.round(this.durationInMs / 1e3);
    const artists = [];
    data.artists.forEach((v) => {
      artists.push({
        name: v.name,
        id: v.id,
        url: v.external_urls.spotify
      });
    });
    this.artists = artists;
    if (!data.album?.name)
      this.album = void 0;
    else {
      this.album = {
        name: data.album.name,
        url: data.external_urls.spotify,
        id: data.album.id,
        release_date: data.album.release_date,
        release_date_precision: data.album.release_date_precision,
        total_tracks: data.album.total_tracks
      };
    }
    if (!data.album?.images?.[0])
      this.thumbnail = void 0;
    else
      this.thumbnail = data.album.images[0];
  }
  toJSON() {
    return {
      name: this.name,
      id: this.id,
      url: this.url,
      explicit: this.explicit,
      durationInMs: this.durationInMs,
      durationInSec: this.durationInSec,
      artists: this.artists,
      album: this.album,
      thumbnail: this.thumbnail
    };
  }
};
var SpotifyPlaylist = class {
  name;
  type;
  collaborative;
  description;
  url;
  id;
  thumbnail;
  owner;
  tracksCount;
  spotifyData;
  fetched_tracks;
  search;
  constructor(data, spotifyData2, search2) {
    this.name = data.name;
    this.type = "playlist";
    this.search = search2;
    this.collaborative = data.collaborative;
    this.description = data.description;
    this.url = data.external_urls.spotify;
    this.id = data.id;
    this.thumbnail = data.images[0];
    this.owner = {
      name: data.owner.display_name,
      url: data.owner.external_urls.spotify,
      id: data.owner.id
    };
    this.tracksCount = Number(data.tracks.total);
    const videos = [];
    if (!this.search)
      data.tracks.items.forEach((v) => {
        if (v.track)
          videos.push(new SpotifyTrack(v.track));
      });
    this.fetched_tracks = /* @__PURE__ */ new Map();
    this.fetched_tracks.set("1", videos);
    this.spotifyData = spotifyData2;
  }
  async fetch() {
    if (this.search)
      return this;
    let fetching;
    if (this.tracksCount > 1e3)
      fetching = 1e3;
    else
      fetching = this.tracksCount;
    if (fetching <= 100)
      return this;
    const work = [];
    for (let i = 2; i <= Math.ceil(fetching / 100); i++) {
      work.push(new Promise(async (resolve, reject) => {
        const response = await request(`https://api.spotify.com/v1/playlists/${this.id}/tracks?offset=${(i - 1) * 100}&limit=100&market=${this.spotifyData.market}`, {
          headers: {
            Authorization: `${this.spotifyData.token_type} ${this.spotifyData.access_token}`
          }
        }).catch((err) => reject(`Response Error : 
${err}`));
        const videos = [];
        if (typeof response !== "string")
          return;
        const json_data = JSON.parse(response);
        json_data.items.forEach((v) => {
          if (v.track)
            videos.push(new SpotifyTrack(v.track));
        });
        this.fetched_tracks.set(`${i}`, videos);
        resolve("Success");
      }));
    }
    await Promise.allSettled(work);
    return this;
  }
  page(num) {
    if (!num)
      throw new Error("Page number is not provided");
    if (!this.fetched_tracks.has(`${num}`))
      throw new Error("Given Page number is invalid");
    return this.fetched_tracks.get(`${num}`);
  }
  get total_pages() {
    return this.fetched_tracks.size;
  }
  get total_tracks() {
    if (this.search)
      return this.tracksCount;
    const page_number = this.total_pages;
    return (page_number - 1) * 100 + this.fetched_tracks.get(`${page_number}`).length;
  }
  async all_tracks() {
    await this.fetch();
    const tracks = [];
    for (const page of this.fetched_tracks.values())
      tracks.push(...page);
    return tracks;
  }
  toJSON() {
    return {
      name: this.name,
      collaborative: this.collaborative,
      description: this.description,
      url: this.url,
      id: this.id,
      thumbnail: this.thumbnail,
      owner: this.owner,
      tracksCount: this.tracksCount
    };
  }
};
var SpotifyAlbum = class {
  name;
  type;
  url;
  id;
  thumbnail;
  artists;
  copyrights;
  release_date;
  release_date_precision;
  tracksCount;
  spotifyData;
  fetched_tracks;
  search;
  constructor(data, spotifyData2, search2) {
    this.name = data.name;
    this.type = "album";
    this.id = data.id;
    this.search = search2;
    this.url = data.external_urls.spotify;
    this.thumbnail = data.images[0];
    const artists = [];
    data.artists.forEach((v) => {
      artists.push({
        name: v.name,
        id: v.id,
        url: v.external_urls.spotify
      });
    });
    this.artists = artists;
    this.copyrights = data.copyrights;
    this.release_date = data.release_date;
    this.release_date_precision = data.release_date_precision;
    this.tracksCount = data.total_tracks;
    const videos = [];
    if (!this.search)
      data.tracks.items.forEach((v) => {
        videos.push(new SpotifyTrack(v));
      });
    this.fetched_tracks = /* @__PURE__ */ new Map();
    this.fetched_tracks.set("1", videos);
    this.spotifyData = spotifyData2;
  }
  async fetch() {
    if (this.search)
      return this;
    let fetching;
    if (this.tracksCount > 500)
      fetching = 500;
    else
      fetching = this.tracksCount;
    if (fetching <= 50)
      return this;
    const work = [];
    for (let i = 2; i <= Math.ceil(fetching / 50); i++) {
      work.push(new Promise(async (resolve, reject) => {
        const response = await request(`https://api.spotify.com/v1/albums/${this.id}/tracks?offset=${(i - 1) * 50}&limit=50&market=${this.spotifyData.market}`, {
          headers: {
            Authorization: `${this.spotifyData.token_type} ${this.spotifyData.access_token}`
          }
        }).catch((err) => reject(`Response Error : 
${err}`));
        const videos = [];
        if (typeof response !== "string")
          return;
        const json_data = JSON.parse(response);
        json_data.items.forEach((v) => {
          if (v)
            videos.push(new SpotifyTrack(v));
        });
        this.fetched_tracks.set(`${i}`, videos);
        resolve("Success");
      }));
    }
    await Promise.allSettled(work);
    return this;
  }
  page(num) {
    if (!num)
      throw new Error("Page number is not provided");
    if (!this.fetched_tracks.has(`${num}`))
      throw new Error("Given Page number is invalid");
    return this.fetched_tracks.get(`${num}`);
  }
  get total_pages() {
    return this.fetched_tracks.size;
  }
  get total_tracks() {
    if (this.search)
      return this.tracksCount;
    const page_number = this.total_pages;
    return (page_number - 1) * 100 + this.fetched_tracks.get(`${page_number}`).length;
  }
  async all_tracks() {
    await this.fetch();
    const tracks = [];
    for (const page of this.fetched_tracks.values())
      tracks.push(...page);
    return tracks;
  }
  toJSON() {
    return {
      name: this.name,
      id: this.id,
      type: this.type,
      url: this.url,
      thumbnail: this.thumbnail,
      artists: this.artists,
      copyrights: this.copyrights,
      release_date: this.release_date,
      release_date_precision: this.release_date_precision,
      tracksCount: this.tracksCount
    };
  }
};

// play-dl/Spotify/index.ts
var import_node_fs2 = require("fs");
var spotifyData;
if ((0, import_node_fs2.existsSync)(".data/spotify.data")) {
  spotifyData = JSON.parse((0, import_node_fs2.readFileSync)(".data/spotify.data", "utf-8"));
  spotifyData.file = true;
}
var pattern = /^((https:)?\/\/)?open\.spotify\.com\/(?:intl\-.{2}\/)?(track|album|playlist)\//;
async function spotify(url) {
  if (!spotifyData)
    throw new Error("Spotify Data is missing\nDid you forgot to do authorization ?");
  const url_ = url.trim();
  if (!url_.match(pattern))
    throw new Error("This is not a Spotify URL");
  if (url_.indexOf("track/") !== -1) {
    const trackID = url_.split("track/")[1].split("&")[0].split("?")[0];
    const response = await request(`https://api.spotify.com/v1/tracks/${trackID}?market=${spotifyData.market}`, {
      headers: {
        Authorization: `${spotifyData.token_type} ${spotifyData.access_token}`
      }
    }).catch((err) => {
      return err;
    });
    if (response instanceof Error)
      throw response;
    const resObj = JSON.parse(response);
    if (resObj.error)
      throw new Error(`Got ${resObj.error.status} from the spotify request: ${resObj.error.message}`);
    return new SpotifyTrack(resObj);
  } else if (url_.indexOf("album/") !== -1) {
    const albumID = url.split("album/")[1].split("&")[0].split("?")[0];
    const response = await request(`https://api.spotify.com/v1/albums/${albumID}?market=${spotifyData.market}`, {
      headers: {
        Authorization: `${spotifyData.token_type} ${spotifyData.access_token}`
      }
    }).catch((err) => {
      return err;
    });
    if (response instanceof Error)
      throw response;
    const resObj = JSON.parse(response);
    if (resObj.error)
      throw new Error(`Got ${resObj.error.status} from the spotify request: ${resObj.error.message}`);
    return new SpotifyAlbum(resObj, spotifyData, false);
  } else if (url_.indexOf("playlist/") !== -1) {
    const playlistID = url.split("playlist/")[1].split("&")[0].split("?")[0];
    const response = await request(`https://api.spotify.com/v1/playlists/${playlistID}?market=${spotifyData.market}`, {
      headers: {
        Authorization: `${spotifyData.token_type} ${spotifyData.access_token}`
      }
    }).catch((err) => {
      return err;
    });
    if (response instanceof Error)
      throw response;
    const resObj = JSON.parse(response);
    if (resObj.error)
      throw new Error(`Got ${resObj.error.status} from the spotify request: ${resObj.error.message}`);
    return new SpotifyPlaylist(resObj, spotifyData, false);
  } else
    throw new Error("URL is out of scope for play-dl.");
}
function sp_validate(url) {
  const url_ = url.trim();
  if (!url_.startsWith("https"))
    return "search";
  if (!url_.match(pattern))
    return false;
  if (url_.indexOf("track/") !== -1) {
    return "track";
  } else if (url_.indexOf("album/") !== -1) {
    return "album";
  } else if (url_.indexOf("playlist/") !== -1) {
    return "playlist";
  } else
    return false;
}
async function SpotifyAuthorize(data, file) {
  const response = await request(`https://accounts.spotify.com/api/token`, {
    headers: {
      "Authorization": `Basic ${Buffer.from(`${data.client_id}:${data.client_secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `grant_type=authorization_code&code=${data.authorization_code}&redirect_uri=${encodeURI(data.redirect_url)}`,
    method: "POST"
  }).catch((err) => {
    return err;
  });
  if (response instanceof Error)
    throw response;
  const resp_json = JSON.parse(response);
  spotifyData = {
    client_id: data.client_id,
    client_secret: data.client_secret,
    redirect_url: data.redirect_url,
    access_token: resp_json.access_token,
    refresh_token: resp_json.refresh_token,
    expires_in: Number(resp_json.expires_in),
    expiry: Date.now() + (resp_json.expires_in - 1) * 1e3,
    token_type: resp_json.token_type,
    market: data.market
  };
  if (file)
    (0, import_node_fs2.writeFileSync)(".data/spotify.data", JSON.stringify(spotifyData, void 0, 4));
  else {
    console.log(`Client ID : ${spotifyData.client_id}`);
    console.log(`Client Secret : ${spotifyData.client_secret}`);
    console.log(`Refresh Token : ${spotifyData.refresh_token}`);
    console.log(`Market : ${spotifyData.market}`);
    console.log(`
Paste above info in setToken function.`);
  }
  return true;
}
function is_expired() {
  if (Date.now() >= spotifyData.expiry)
    return true;
  else
    return false;
}
async function sp_search(query, type, limit = 10) {
  const results = [];
  if (!spotifyData)
    throw new Error("Spotify Data is missing\nDid you forget to do authorization ?");
  if (query.length === 0)
    throw new Error("Pass some query to search.");
  if (limit > 50 || limit < 0)
    throw new Error(`You crossed limit range of Spotify [ 0 - 50 ]`);
  const response = await request(`https://api.spotify.com/v1/search?type=${type}&q=${query}&limit=${limit}&market=${spotifyData.market}`, {
    headers: {
      Authorization: `${spotifyData.token_type} ${spotifyData.access_token}`
    }
  }).catch((err) => {
    return err;
  });
  if (response instanceof Error)
    throw response;
  const json_data = JSON.parse(response);
  if (type === "track") {
    json_data.tracks.items.forEach((track) => {
      results.push(new SpotifyTrack(track));
    });
  } else if (type === "album") {
    json_data.albums.items.forEach((album) => {
      results.push(new SpotifyAlbum(album, spotifyData, true));
    });
  } else if (type === "playlist") {
    json_data.playlists.items.forEach((playlist) => {
      results.push(new SpotifyPlaylist(playlist, spotifyData, true));
    });
  }
  return results;
}
async function refreshToken() {
  const response = await request(`https://accounts.spotify.com/api/token`, {
    headers: {
      "Authorization": `Basic ${Buffer.from(`${spotifyData.client_id}:${spotifyData.client_secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `grant_type=refresh_token&refresh_token=${spotifyData.refresh_token}`,
    method: "POST"
  }).catch((err) => {
    return err;
  });
  if (response instanceof Error)
    return false;
  const resp_json = JSON.parse(response);
  spotifyData.access_token = resp_json.access_token;
  spotifyData.expires_in = Number(resp_json.expires_in);
  spotifyData.expiry = Date.now() + (resp_json.expires_in - 1) * 1e3;
  spotifyData.token_type = resp_json.token_type;
  if (spotifyData.file)
    (0, import_node_fs2.writeFileSync)(".data/spotify.data", JSON.stringify(spotifyData, void 0, 4));
  return true;
}
async function setSpotifyToken(options) {
  spotifyData = options;
  spotifyData.file = false;
  await refreshToken();
}

// play-dl/SoundCloud/index.ts
var import_node_fs3 = require("fs");

// play-dl/SoundCloud/classes.ts
var import_node_stream3 = require("stream");
var SoundCloudTrack = class {
  name;
  id;
  url;
  permalink;
  fetched;
  type;
  durationInSec;
  durationInMs;
  formats;
  publisher;
  thumbnail;
  user;
  constructor(data) {
    this.name = data.title;
    this.id = data.id;
    this.url = data.uri;
    this.permalink = data.permalink_url;
    this.fetched = true;
    this.type = "track";
    this.durationInSec = Math.round(Number(data.duration) / 1e3);
    this.durationInMs = Number(data.duration);
    if (data.publisher_metadata)
      this.publisher = {
        name: data.publisher_metadata.publisher,
        id: data.publisher_metadata.id,
        artist: data.publisher_metadata.artist,
        contains_music: Boolean(data.publisher_metadata.contains_music) || false,
        writer_composer: data.publisher_metadata.writer_composer
      };
    else
      this.publisher = null;
    this.formats = data.media.transcodings;
    this.user = {
      name: data.user.username,
      id: data.user.id,
      type: "user",
      url: data.user.permalink_url,
      verified: Boolean(data.user.verified) || false,
      description: data.user.description,
      first_name: data.user.first_name,
      full_name: data.user.full_name,
      last_name: data.user.last_name,
      thumbnail: data.user.avatar_url
    };
    this.thumbnail = data.artwork_url;
  }
  toJSON() {
    return {
      name: this.name,
      id: this.id,
      url: this.url,
      permalink: this.permalink,
      fetched: this.fetched,
      durationInMs: this.durationInMs,
      durationInSec: this.durationInSec,
      publisher: this.publisher,
      formats: this.formats,
      thumbnail: this.thumbnail,
      user: this.user
    };
  }
};
var SoundCloudPlaylist = class {
  name;
  id;
  url;
  type;
  sub_type;
  durationInSec;
  durationInMs;
  user;
  tracks;
  tracksCount;
  client_id;
  constructor(data, client_id) {
    this.name = data.title;
    this.id = data.id;
    this.url = data.uri;
    this.client_id = client_id;
    this.type = "playlist";
    this.sub_type = data.set_type;
    this.durationInSec = Math.round(Number(data.duration) / 1e3);
    this.durationInMs = Number(data.duration);
    this.user = {
      name: data.user.username,
      id: data.user.id,
      type: "user",
      url: data.user.permalink_url,
      verified: Boolean(data.user.verified) || false,
      description: data.user.description,
      first_name: data.user.first_name,
      full_name: data.user.full_name,
      last_name: data.user.last_name,
      thumbnail: data.user.avatar_url
    };
    this.tracksCount = data.track_count;
    const tracks = [];
    data.tracks.forEach((track) => {
      if (track.title) {
        tracks.push(new SoundCloudTrack(track));
      } else
        tracks.push({
          id: track.id,
          fetched: false,
          type: "track"
        });
    });
    this.tracks = tracks;
  }
  async fetch() {
    const work = [];
    for (let i = 0; i < this.tracks.length; i++) {
      if (!this.tracks[i].fetched) {
        work.push(new Promise(async (resolve) => {
          const num = i;
          const data = await request(`https://api-v2.soundcloud.com/tracks/${this.tracks[i].id}?client_id=${this.client_id}`);
          this.tracks[num] = new SoundCloudTrack(JSON.parse(data));
          resolve("");
        }));
      }
    }
    await Promise.allSettled(work);
    return this;
  }
  get total_tracks() {
    let count = 0;
    this.tracks.forEach((track) => {
      if (track instanceof SoundCloudTrack)
        count++;
      else
        return;
    });
    return count;
  }
  async all_tracks() {
    await this.fetch();
    return this.tracks;
  }
  toJSON() {
    return {
      name: this.name,
      id: this.id,
      sub_type: this.sub_type,
      url: this.url,
      durationInMs: this.durationInMs,
      durationInSec: this.durationInSec,
      tracksCount: this.tracksCount,
      user: this.user,
      tracks: this.tracks
    };
  }
};
var SoundCloudStream = class {
  stream;
  type;
  url;
  downloaded_time;
  timer;
  downloaded_segments;
  request;
  time;
  segment_urls;
  constructor(url, type = "arbitrary" /* Arbitrary */) {
    this.stream = new import_node_stream3.Readable({ highWaterMark: 5 * 1e3 * 1e3, read() {
    } });
    this.type = type;
    this.url = url;
    this.downloaded_time = 0;
    this.request = null;
    this.downloaded_segments = 0;
    this.time = [];
    this.timer = new Timer(() => {
      this.timer.reuse();
      this.start();
    }, 280);
    this.segment_urls = [];
    this.stream.on("close", () => {
      this.cleanup();
    });
    this.start();
  }
  async parser() {
    const response = await request(this.url).catch((err) => {
      return err;
    });
    if (response instanceof Error)
      throw response;
    const array = response.split("\n");
    array.forEach((val) => {
      if (val.startsWith("#EXTINF:")) {
        this.time.push(parseFloat(val.replace("#EXTINF:", "")));
      } else if (val.startsWith("https")) {
        this.segment_urls.push(val);
      }
    });
    return;
  }
  async start() {
    if (this.stream.destroyed) {
      this.cleanup();
      return;
    }
    this.time = [];
    this.segment_urls = [];
    this.downloaded_time = 0;
    await this.parser();
    this.segment_urls.splice(0, this.downloaded_segments);
    this.loop();
  }
  async loop() {
    if (this.stream.destroyed) {
      this.cleanup();
      return;
    }
    if (this.time.length === 0 || this.segment_urls.length === 0) {
      this.cleanup();
      this.stream.push(null);
      return;
    }
    this.downloaded_time += this.time.shift();
    this.downloaded_segments++;
    const stream4 = await request_stream(this.segment_urls.shift()).catch((err) => err);
    if (stream4 instanceof Error) {
      this.stream.emit("error", stream4);
      this.cleanup();
      return;
    }
    this.request = stream4;
    stream4.on("data", (c) => {
      this.stream.push(c);
    });
    stream4.on("end", () => {
      if (this.downloaded_time >= 300)
        return;
      else
        this.loop();
    });
    stream4.once("error", (err) => {
      this.stream.emit("error", err);
    });
  }
  cleanup() {
    this.timer.destroy();
    this.request?.destroy();
    this.url = "";
    this.downloaded_time = 0;
    this.downloaded_segments = 0;
    this.request = null;
    this.time = [];
    this.segment_urls = [];
  }
  pause() {
    this.timer.pause();
  }
  resume() {
    this.timer.resume();
  }
};

// play-dl/SoundCloud/index.ts
var soundData;
if ((0, import_node_fs3.existsSync)(".data/soundcloud.data")) {
  soundData = JSON.parse((0, import_node_fs3.readFileSync)(".data/soundcloud.data", "utf-8"));
}
var pattern2 = /^(?:(https?):\/\/)?(?:(?:www|m)\.)?(api\.soundcloud\.com|soundcloud\.com|snd\.sc)\/(.*)$/;
async function soundcloud(url) {
  if (!soundData)
    throw new Error("SoundCloud Data is missing\nDid you forget to do authorization ?");
  const url_ = url.trim();
  if (!url_.match(pattern2))
    throw new Error("This is not a SoundCloud URL");
  const data = await request(`https://api-v2.soundcloud.com/resolve?url=${url_}&client_id=${soundData.client_id}`).catch((err) => err);
  if (data instanceof Error)
    throw data;
  const json_data = JSON.parse(data);
  if (json_data.kind !== "track" && json_data.kind !== "playlist")
    throw new Error("This url is out of scope for play-dl.");
  if (json_data.kind === "track")
    return new SoundCloudTrack(json_data);
  else
    return new SoundCloudPlaylist(json_data, soundData.client_id);
}
async function so_search(query, type, limit = 10) {
  const response = await request(`https://api-v2.soundcloud.com/search/${type}?q=${query}&client_id=${soundData.client_id}&limit=${limit}`);
  const results = [];
  const json_data = JSON.parse(response);
  json_data.collection.forEach((x) => {
    if (type === "tracks")
      results.push(new SoundCloudTrack(x));
    else
      results.push(new SoundCloudPlaylist(x, soundData.client_id));
  });
  return results;
}
async function stream2(url, quality) {
  const data = await soundcloud(url);
  if (data instanceof SoundCloudPlaylist)
    throw new Error("Streams can't be created from playlist urls");
  const HLSformats = parseHlsFormats(data.formats);
  if (typeof quality !== "number")
    quality = HLSformats.length - 1;
  else if (quality <= 0)
    quality = 0;
  else if (quality >= HLSformats.length)
    quality = HLSformats.length - 1;
  const req_url = HLSformats[quality].url + "?client_id=" + soundData.client_id;
  const s_data = JSON.parse(await request(req_url));
  const type = HLSformats[quality].format.mime_type.startsWith("audio/ogg") ? "ogg/opus" /* OggOpus */ : "arbitrary" /* Arbitrary */;
  return new SoundCloudStream(s_data.url, type);
}
async function getFreeClientID() {
  const data = await request("https://soundcloud.com/", { headers: {} }).catch((err) => err);
  if (data instanceof Error)
    throw new Error("Failed to get response from soundcloud.com: " + data.message);
  const splitted = data.split('<script crossorigin src="');
  const urls = [];
  splitted.forEach((r) => {
    if (r.startsWith("https")) {
      urls.push(r.split('"')[0]);
    }
  });
  const data2 = await request(urls[urls.length - 1]);
  return data2.split(',client_id:"')[1].split('"')[0];
}
async function stream_from_info2(data, quality) {
  const HLSformats = parseHlsFormats(data.formats);
  if (typeof quality !== "number")
    quality = HLSformats.length - 1;
  else if (quality <= 0)
    quality = 0;
  else if (quality >= HLSformats.length)
    quality = HLSformats.length - 1;
  const req_url = HLSformats[quality].url + "?client_id=" + soundData.client_id;
  const s_data = JSON.parse(await request(req_url));
  const type = HLSformats[quality].format.mime_type.startsWith("audio/ogg") ? "ogg/opus" /* OggOpus */ : "arbitrary" /* Arbitrary */;
  return new SoundCloudStream(s_data.url, type);
}
async function check_id(id) {
  const response = await request(`https://api-v2.soundcloud.com/search?client_id=${id}&q=Rick+Roll&limit=0`).catch((err) => {
    return err;
  });
  if (response instanceof Error)
    return false;
  else
    return true;
}
async function so_validate(url) {
  const url_ = url.trim();
  if (!url_.startsWith("https"))
    return "search";
  if (!url_.match(pattern2))
    return false;
  const data = await request(`https://api-v2.soundcloud.com/resolve?url=${url_}&client_id=${soundData.client_id}`).catch((err) => err);
  if (data instanceof Error)
    return false;
  const json_data = JSON.parse(data);
  if (json_data.kind === "track")
    return "track";
  else if (json_data.kind === "playlist")
    return "playlist";
  else
    return false;
}
function parseHlsFormats(data) {
  const result = [];
  data.forEach((format) => {
    if (format.format.protocol === "hls")
      result.push(format);
  });
  return result;
}
function setSoundCloudToken(options) {
  soundData = options;
}

// play-dl/Deezer/index.ts
var import_node_url6 = require("url");

// play-dl/Deezer/classes.ts
var DeezerTrack = class {
  id;
  title;
  shortTitle;
  url;
  durationInSec;
  rank;
  explicit;
  previewURL;
  artist;
  album;
  type;
  partial;
  trackPosition;
  diskNumber;
  releaseDate;
  bpm;
  gain;
  contributors;
  constructor(data, partial) {
    this.id = data.id;
    this.title = data.title;
    this.shortTitle = data.title_short;
    this.url = data.link;
    this.durationInSec = data.duration;
    this.rank = data.rank;
    this.explicit = data.explicit_lyrics;
    this.previewURL = data.preview;
    this.artist = new DeezerArtist(data.artist);
    this.album = new DeezerTrackAlbum(data.album);
    this.type = "track";
    this.partial = partial;
    if (!partial) {
      this.trackPosition = data.track_position;
      this.diskNumber = data.disk_number;
      this.releaseDate = new Date(data.release_date);
      this.bpm = data.bpm;
      this.gain = data.gain;
      this.contributors = [];
      data.contributors.forEach((contributor) => {
        this.contributors?.push(new DeezerArtist(contributor));
      });
    }
  }
  async fetch() {
    if (!this.partial)
      return this;
    const response = await request(`https://api.deezer.com/track/${this.id}/`).catch((err) => err);
    if (response instanceof Error)
      throw response;
    const jsonData = JSON.parse(response);
    this.partial = false;
    this.trackPosition = jsonData.track_position;
    this.diskNumber = jsonData.disk_number;
    this.releaseDate = new Date(jsonData.release_date);
    this.bpm = jsonData.bpm;
    this.gain = jsonData.gain;
    this.contributors = [];
    jsonData.contributors.forEach((contributor) => {
      this.contributors?.push(new DeezerArtist(contributor));
    });
    return this;
  }
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      shortTitle: this.shortTitle,
      url: this.url,
      durationInSec: this.durationInSec,
      rank: this.rank,
      explicit: this.explicit,
      previewURL: this.previewURL,
      artist: this.artist,
      album: this.album,
      type: this.type,
      trackPosition: this.trackPosition,
      diskNumber: this.diskNumber,
      releaseDate: this.releaseDate,
      bpm: this.bpm,
      gain: this.gain,
      contributors: this.contributors
    };
  }
};
var DeezerAlbum = class {
  id;
  title;
  url;
  recordType;
  explicit;
  artist;
  cover;
  type;
  tracksCount;
  partial;
  upc;
  durationInSec;
  numberOfFans;
  releaseDate;
  available;
  genres;
  contributors;
  tracks;
  constructor(data, partial) {
    this.id = data.id;
    this.title = data.title;
    this.url = data.link;
    this.recordType = data.record_type;
    this.explicit = data.explicit_lyrics;
    this.artist = new DeezerArtist(data.artist);
    this.type = "album";
    this.tracksCount = data.nb_tracks;
    this.contributors = [];
    this.genres = [];
    this.tracks = [];
    this.cover = {
      xl: data.cover_xl,
      big: data.cover_big,
      medium: data.cover_medium,
      small: data.cover_small
    };
    this.partial = partial;
    if (!partial) {
      this.upc = data.upc;
      this.durationInSec = data.duration;
      this.numberOfFans = data.fans;
      this.releaseDate = new Date(data.release_date);
      this.available = data.available;
      data.contributors.forEach((contributor) => {
        this.contributors?.push(new DeezerArtist(contributor));
      });
      data.genres.data.forEach((genre) => {
        this.genres?.push({
          name: genre.name,
          picture: {
            xl: `${genre.picture}?size=xl`,
            big: `${genre.picture}?size=big`,
            medium: `${genre.picture}?size=medium`,
            small: `${genre.picture}?size=small`
          }
        });
      });
      const trackAlbum = {
        id: this.id,
        title: this.title,
        cover_xl: this.cover.xl,
        cover_big: this.cover.big,
        cover_medium: this.cover.medium,
        cover_small: this.cover.small,
        release_date: data.release_date
      };
      data.tracks.data.forEach((track) => {
        track.album = trackAlbum;
        this.tracks.push(new DeezerTrack(track, true));
      });
    }
  }
  async fetch() {
    if (!this.partial)
      return this;
    const response = await request(`https://api.deezer.com/album/${this.id}/`).catch((err) => err);
    if (response instanceof Error)
      throw response;
    const jsonData = JSON.parse(response);
    this.partial = false;
    this.upc = jsonData.upc;
    this.durationInSec = jsonData.duration;
    this.numberOfFans = jsonData.fans;
    this.releaseDate = new Date(jsonData.release_date);
    this.available = jsonData.available;
    this.contributors = [];
    this.genres = [];
    this.tracks = [];
    jsonData.contributors.forEach((contributor) => {
      this.contributors?.push(new DeezerArtist(contributor));
    });
    jsonData.genres.data.forEach((genre) => {
      this.genres?.push({
        name: genre.name,
        picture: {
          xl: `${genre.picture}?size=xl`,
          big: `${genre.picture}?size=big`,
          medium: `${genre.picture}?size=medium`,
          small: `${genre.picture}?size=small`
        }
      });
    });
    const trackAlbum = {
      id: this.id,
      title: this.title,
      cover_xl: this.cover.xl,
      cover_big: this.cover.big,
      cover_medium: this.cover.medium,
      cover_small: this.cover.small,
      release_date: jsonData.release_date
    };
    jsonData.tracks.data.forEach((track) => {
      track.album = trackAlbum;
      this.tracks.push(new DeezerTrack(track, true));
    });
    return this;
  }
  async all_tracks() {
    await this.fetch();
    return this.tracks;
  }
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      url: this.url,
      recordType: this.recordType,
      explicit: this.explicit,
      artist: this.artist,
      cover: this.cover,
      type: this.type,
      upc: this.upc,
      tracksCount: this.tracksCount,
      durationInSec: this.durationInSec,
      numberOfFans: this.numberOfFans,
      releaseDate: this.releaseDate,
      available: this.available,
      genres: this.genres,
      contributors: this.contributors,
      tracks: this.tracks.map((track) => track.toJSON())
    };
  }
};
var DeezerPlaylist = class {
  id;
  title;
  public;
  url;
  picture;
  creationDate;
  type;
  creator;
  tracksCount;
  partial;
  description;
  durationInSec;
  isLoved;
  collaborative;
  fans;
  tracks;
  constructor(data, partial) {
    this.id = data.id;
    this.title = data.title;
    this.public = data.public;
    this.url = data.link;
    this.creationDate = new Date(data.creation_date);
    this.type = "playlist";
    this.tracksCount = data.nb_tracks;
    this.tracks = [];
    this.picture = {
      xl: data.picture_xl,
      big: data.picture_big,
      medium: data.picture_medium,
      small: data.picture_small
    };
    if (data.user) {
      this.creator = {
        id: data.user.id,
        name: data.user.name
      };
    } else {
      this.creator = {
        id: data.creator.id,
        name: data.creator.name
      };
    }
    this.partial = partial;
    if (!partial) {
      this.description = data.description;
      this.durationInSec = data.duration;
      this.isLoved = data.is_loved_track;
      this.collaborative = data.collaborative;
      this.fans = data.fans;
      if (this.public) {
        this.tracks = data.tracks.data.map((track) => {
          return new DeezerTrack(track, true);
        });
      }
    }
  }
  async fetch() {
    if (!this.partial && (this.tracks.length === this.tracksCount || !this.public)) {
      return this;
    }
    if (this.partial) {
      const response = await request(`https://api.deezer.com/playlist/${this.id}/`).catch((err) => err);
      if (response instanceof Error)
        throw response;
      const jsonData = JSON.parse(response);
      this.partial = false;
      this.description = jsonData.description;
      this.durationInSec = jsonData.duration;
      this.isLoved = jsonData.is_loved_track;
      this.collaborative = jsonData.collaborative;
      this.fans = jsonData.fans;
      if (this.public) {
        this.tracks = jsonData.tracks.data.map((track) => {
          return new DeezerTrack(track, true);
        });
      }
    }
    const currentTracksCount = this.tracks.length;
    if (this.public && currentTracksCount !== this.tracksCount) {
      let missing = this.tracksCount - currentTracksCount;
      if (missing > 1e3)
        missing = 1e3;
      const promises = [];
      for (let i = 1; i <= Math.ceil(missing / 100); i++) {
        promises.push(new Promise(async (resolve, reject) => {
          const response = await request(`https://api.deezer.com/playlist/${this.id}/tracks?limit=100&index=${i * 100}`).catch((err) => reject(err));
          if (typeof response !== "string")
            return;
          const jsonData = JSON.parse(response);
          const tracks = jsonData.data.map((track) => {
            return new DeezerTrack(track, true);
          });
          resolve(tracks);
        }));
      }
      const results = await Promise.allSettled(promises);
      const newTracks = [];
      for (const result of results) {
        if (result.status === "fulfilled") {
          newTracks.push(...result.value);
        } else {
          throw result.reason;
        }
      }
      this.tracks.push(...newTracks);
    }
    return this;
  }
  async all_tracks() {
    await this.fetch();
    return this.tracks;
  }
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      public: this.public,
      url: this.url,
      picture: this.picture,
      creationDate: this.creationDate,
      type: this.type,
      creator: this.creator,
      tracksCount: this.tracksCount,
      description: this.description,
      durationInSec: this.durationInSec,
      isLoved: this.isLoved,
      collaborative: this.collaborative,
      fans: this.fans,
      tracks: this.tracks.map((track) => track.toJSON())
    };
  }
};
var DeezerTrackAlbum = class {
  id;
  title;
  url;
  cover;
  releaseDate;
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.url = `https://www.deezer.com/album/${data.id}/`;
    this.cover = {
      xl: data.cover_xl,
      big: data.cover_big,
      medium: data.cover_medium,
      small: data.cover_small
    };
    if (data.release_date)
      this.releaseDate = new Date(data.release_date);
  }
};
var DeezerArtist = class {
  id;
  name;
  url;
  picture;
  role;
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.url = data.link ? data.link : `https://www.deezer.com/artist/${data.id}/`;
    if (data.picture_xl)
      this.picture = {
        xl: data.picture_xl,
        big: data.picture_big,
        medium: data.picture_medium,
        small: data.picture_small
      };
    if (data.role)
      this.role = data.role;
  }
};

// play-dl/Deezer/index.ts
async function internalValidate(url) {
  let urlObj;
  try {
    urlObj = new import_node_url6.URL(url);
  } catch {
    return { type: "search" };
  }
  if (urlObj.protocol !== "https:" && urlObj.protocol !== "http:") {
    return { type: "search" };
  }
  let pathname = urlObj.pathname;
  if (pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  const path = pathname.split("/");
  switch (urlObj.hostname) {
    case "deezer.com":
    case "www.deezer.com": {
      if (path.length === 4) {
        const lang = path.splice(1, 1)[0];
        if (!lang.match(/^[a-z]{2}$/)) {
          return { type: false };
        }
      } else if (path.length !== 3) {
        return { type: false };
      }
      if ((path[1] === "track" || path[1] === "album" || path[1] === "playlist") && path[2].match(/^\d+$/)) {
        return {
          type: path[1],
          id: path[2]
        };
      } else {
        return { type: false };
      }
    }
    case "api.deezer.com": {
      if (path.length === 3 && (path[1] === "track" || path[1] === "album" || path[1] === "playlist") && path[2].match(/^\d+$/)) {
        return {
          type: path[1],
          id: path[2]
        };
      } else {
        return { type: false };
      }
    }
    case "deezer.page.link": {
      if (path.length === 2 && path[1].match(/^[A-Za-z0-9]+$/)) {
        const resolved = await request_resolve_redirect(url).catch((err) => err);
        if (resolved instanceof Error) {
          return { type: false, error: resolved.message };
        }
        return await internalValidate(resolved);
      } else {
        return { type: false };
      }
    }
    default:
      return { type: "search" };
  }
}
async function deezer(url) {
  const typeData = await internalValidate(url.trim());
  if (typeData.error) {
    throw new Error(`This is not a Deezer track, playlist or album URL:
${typeData.error}`);
  } else if (!typeData.type || typeData.type === "search")
    throw new Error("This is not a Deezer track, playlist or album URL");
  const response = await request(`https://api.deezer.com/${typeData.type}/${typeData.id}`).catch((err) => err);
  if (response instanceof Error)
    throw response;
  const jsonData = JSON.parse(response);
  if (jsonData.error) {
    throw new Error(`Deezer API Error: ${jsonData.error.type}: ${jsonData.error.message}`);
  }
  switch (typeData.type) {
    case "track":
      return new DeezerTrack(jsonData, false);
    case "playlist":
      return new DeezerPlaylist(jsonData, false);
    case "album":
      return new DeezerAlbum(jsonData, false);
  }
}
async function dz_validate(url) {
  const typeData = await internalValidate(url.trim());
  return typeData.type;
}
async function dz_search(query, options) {
  let query_ = query.trim();
  const type = options.type ?? "track";
  const limit = options.limit ?? 10;
  const fuzzy = options.fuzzy ?? true;
  if (query_.length === 0)
    throw new Error("A query is required to search.");
  if (limit > 100)
    throw new Error("The maximum search limit for Deezer is 100");
  if (limit < 1)
    throw new Error("The minimum search limit for Deezer is 1");
  if (type !== "track" && type !== "album" && type != "playlist")
    throw new Error(`"${type}" is not a valid Deezer search type`);
  query_ = encodeURIComponent(query_);
  const response = await request(`https://api.deezer.com/search/${type}/?q=${query_}&limit=${limit}${fuzzy ? "" : "strict=on"}`).catch((err) => err);
  if (response instanceof Error)
    throw response;
  const jsonData = JSON.parse(response);
  if (jsonData.error) {
    throw new Error(`Deezer API Error: ${jsonData.error.type}: ${jsonData.error.message}`);
  }
  let results = [];
  switch (type) {
    case "track":
      results = jsonData.data.map((track) => new DeezerTrack(track, true));
      break;
    case "playlist":
      results = jsonData.data.map((playlist) => new DeezerPlaylist(playlist, true));
      break;
    case "album":
      results = jsonData.data.map((album) => new DeezerAlbum(album, true));
      break;
  }
  return results;
}
async function dz_advanced_track_search(options) {
  const limit = options.limit ?? 10;
  if (limit > 100)
    throw new Error("The maximum search limit for Deezer is 100");
  if (limit < 1)
    throw new Error("The minimum search limit for Deezer is 1");
  const metadata = [];
  if (options.artist)
    metadata.push(`artist:"${encodeURIComponent(options.artist.trim())}"`);
  if (options.album)
    metadata.push(`album:"${encodeURIComponent(options.album.trim())}"`);
  if (options.title)
    metadata.push(`track:"${encodeURIComponent(options.title.trim())}"`);
  if (options.label)
    metadata.push(`label:"${encodeURIComponent(options.label.trim())}"`);
  if (!isNaN(Number(options.minDurationInSec)))
    metadata.push(`dur_min:${options.minDurationInSec}`);
  if (!isNaN(Number(options.maxDurationInSec)))
    metadata.push(`dur_max:${options.maxDurationInSec}`);
  if (!isNaN(Number(options.minBPM)))
    metadata.push(`bpm_min:${options.minBPM}`);
  if (!isNaN(Number(options.maxBPM)))
    metadata.push(`bpm_max:${options.maxBPM}`);
  if (metadata.length === 0)
    throw new Error("At least one type of metadata is required.");
  const response = await request(`https://api.deezer.com/search/track/?q=${metadata.join(" ")}&limit=${limit}`).catch((err) => err);
  if (response instanceof Error)
    throw response;
  const jsonData = JSON.parse(response);
  if (jsonData.error) {
    throw new Error(`Deezer API Error: ${jsonData.error.type}: ${jsonData.error.message}`);
  }
  const results = jsonData.data.map((track) => new DeezerTrack(track, true));
  return results;
}

// play-dl/token.ts
async function setToken(options) {
  if (options.spotify)
    await setSpotifyToken(options.spotify);
  if (options.soundcloud)
    setSoundCloudToken(options.soundcloud);
  if (options.youtube)
    setCookieToken(options.youtube);
  if (options.useragent)
    setUserAgent(options.useragent);
}

// play-dl/index.ts
var import_node_readline = require("readline");
var import_node_fs4 = require("fs");
async function stream3(url, options = {}) {
  const url_ = url.trim();
  if (url_.length === 0)
    throw new Error("Stream URL has a length of 0. Check your url again.");
  if (options.htmldata)
    return await stream(url_, options);
  if (url_.indexOf("spotify") !== -1) {
    throw new Error("Streaming from Spotify is not supported. Please use search() to find a similar track on YouTube or SoundCloud instead.");
  }
  if (url_.indexOf("deezer") !== -1) {
    throw new Error("Streaming from Deezer is not supported. Please use search() to find a similar track on YouTube or SoundCloud instead.");
  }
  if (url_.indexOf("soundcloud") !== -1)
    return await stream2(url_, options.quality);
  else
    return await stream(url_, options);
}
async function search(query, options = {}) {
  if (!options.source)
    options.source = { youtube: "video" };
  const query_ = encodeURIComponent(query.trim());
  if (options.source.youtube)
    return await yt_search(query_, {
      limit: options.limit,
      type: options.source.youtube,
      language: options.language,
      unblurNSFWThumbnails: options.unblurNSFWThumbnails
    });
  else if (options.source.spotify)
    return await sp_search(query_, options.source.spotify, options.limit);
  else if (options.source.soundcloud)
    return await so_search(query_, options.source.soundcloud, options.limit);
  else if (options.source.deezer)
    return await dz_search(query_, { limit: options.limit, type: options.source.deezer, fuzzy: options.fuzzy });
  else
    throw new Error("Not possible to reach Here LOL. Easter Egg of play-dl if someone get this.");
}
async function stream_from_info3(info, options = {}) {
  if (info instanceof SoundCloudTrack)
    return await stream_from_info2(info, options.quality);
  else
    return await stream_from_info(info, options);
}
async function validate(url) {
  let check;
  const url_ = url.trim();
  if (!url_.startsWith("https"))
    return "search";
  if (url_.indexOf("spotify") !== -1) {
    check = sp_validate(url_);
    return check !== false ? "sp_" + check : false;
  } else if (url_.indexOf("soundcloud") !== -1) {
    check = await so_validate(url_);
    return check !== false ? "so_" + check : false;
  } else if (url_.indexOf("deezer") !== -1) {
    check = await dz_validate(url_);
    return check !== false ? "dz_" + check : false;
  } else {
    check = yt_validate(url_);
    return check !== false ? "yt_" + check : false;
  }
}
function authorization() {
  const ask = (0, import_node_readline.createInterface)({
    input: process.stdin,
    output: process.stdout
  });
  ask.question("Do you want to save data in a file ? (Yes / No): ", (msg) => {
    let file;
    if (msg.toLowerCase() === "yes")
      file = true;
    else if (msg.toLowerCase() === "no")
      file = false;
    else {
      console.log("That option doesn't exist. Try again...");
      ask.close();
      return;
    }
    ask.question("Choose your service - sc (for SoundCloud) / sp (for Spotify)  / yo (for YouTube): ", (msg2) => {
      if (msg2.toLowerCase().startsWith("sp")) {
        let client_id, client_secret, redirect_url, market;
        ask.question("Start by entering your Client ID : ", (id) => {
          client_id = id;
          ask.question("Now enter your Client Secret : ", (secret) => {
            client_secret = secret;
            ask.question("Enter your Redirect URL now : ", (url) => {
              redirect_url = url;
              console.log("\nIf you would like to know your region code visit : \nhttps://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements \n");
              ask.question("Enter your region code (2-letter country code) : ", (mar) => {
                if (mar.length === 2)
                  market = mar;
                else {
                  console.log("That doesn't look like a valid region code, IN will be selected as default.");
                  market = "IN";
                }
                console.log("\nNow open your browser and paste the below url, then authorize it and copy the redirected url. \n");
                console.log(`https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURI(redirect_url)} 
`);
                ask.question("Paste the url which you just copied : ", async (url2) => {
                  if (!(0, import_node_fs4.existsSync)(".data"))
                    (0, import_node_fs4.mkdirSync)(".data");
                  const spotifyData2 = {
                    client_id,
                    client_secret,
                    redirect_url,
                    authorization_code: url2.split("code=")[1],
                    market
                  };
                  const check = await SpotifyAuthorize(spotifyData2, file);
                  if (check === false)
                    throw new Error("Failed to get access token.");
                  ask.close();
                });
              });
            });
          });
        });
      } else if (msg2.toLowerCase().startsWith("sc")) {
        if (!file) {
          console.log("You already had a client ID, just paste that in setToken function.");
          ask.close();
          return;
        }
        ask.question("Client ID : ", async (id) => {
          let client_id = id;
          if (!client_id) {
            console.log("You didn't provide a client ID. Try again...");
            ask.close();
            return;
          }
          if (!(0, import_node_fs4.existsSync)(".data"))
            (0, import_node_fs4.mkdirSync)(".data");
          console.log("Validating your client ID, hold on...");
          if (await check_id(client_id)) {
            console.log("Client ID has been validated successfully.");
            (0, import_node_fs4.writeFileSync)(".data/soundcloud.data", JSON.stringify({ client_id }, void 0, 4));
          } else
            console.log("That doesn't look like a valid client ID. Retry with a correct client ID.");
          ask.close();
        });
      } else if (msg2.toLowerCase().startsWith("yo")) {
        if (!file) {
          console.log("You already had cookie, just paste that in setToken function.");
          ask.close();
          return;
        }
        ask.question("Cookies : ", (cook) => {
          if (!cook || cook.length === 0) {
            console.log("You didn't provide a cookie. Try again...");
            ask.close();
            return;
          }
          if (!(0, import_node_fs4.existsSync)(".data"))
            (0, import_node_fs4.mkdirSync)(".data");
          console.log("Cookies has been added successfully.");
          let cookie = {};
          cook.split(";").forEach((x) => {
            const arr = x.split("=");
            if (arr.length <= 1)
              return;
            const key = arr.shift()?.trim();
            const value = arr.join("=").trim();
            Object.assign(cookie, { [key]: value });
          });
          (0, import_node_fs4.writeFileSync)(".data/youtube.data", JSON.stringify({ cookie }, void 0, 4));
          ask.close();
        });
      } else {
        console.log("That option doesn't exist. Try again...");
        ask.close();
      }
    });
  });
}
function attachListeners(player, resource) {
  const listeners = player.listeners("idle" /* Idle */);
  for (const cleanup of listeners) {
    if (cleanup.__playDlAttachedListener) {
      cleanup();
      player.removeListener("idle" /* Idle */, cleanup);
    }
  }
  const pauseListener = () => resource.pause();
  const resumeListener = () => resource.resume();
  const idleListener = () => {
    player.removeListener("paused" /* Paused */, pauseListener);
    player.removeListener("autopaused" /* AutoPaused */, pauseListener);
    player.removeListener("playing" /* Playing */, resumeListener);
  };
  pauseListener.__playDlAttachedListener = true;
  resumeListener.__playDlAttachedListener = true;
  idleListener.__playDlAttachedListener = true;
  player.on("paused" /* Paused */, pauseListener);
  player.on("autopaused" /* AutoPaused */, pauseListener);
  player.on("playing" /* Playing */, resumeListener);
  player.once("idle" /* Idle */, idleListener);
}
var play_dl_default = {
  DeezerAlbum,
  DeezerPlaylist,
  DeezerTrack,
  SoundCloudPlaylist,
  SoundCloudStream,
  SoundCloudTrack,
  SpotifyAlbum,
  SpotifyPlaylist,
  SpotifyTrack,
  YouTubeChannel,
  YouTubePlayList,
  YouTubeVideo,
  attachListeners,
  authorization,
  decipher_info,
  deezer,
  dz_advanced_track_search,
  dz_validate,
  extractID,
  getFreeClientID,
  is_expired,
  playlist_info,
  refreshToken,
  search,
  setToken,
  so_validate,
  soundcloud,
  spotify,
  sp_validate,
  stream: stream3,
  stream_from_info: stream_from_info3,
  validate,
  video_basic_info,
  video_info,
  yt_validate
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeezerAlbum,
  DeezerPlaylist,
  DeezerTrack,
  SoundCloudPlaylist,
  SoundCloudStream,
  SoundCloudTrack,
  SpotifyAlbum,
  SpotifyPlaylist,
  SpotifyTrack,
  YouTubeChannel,
  YouTubePlayList,
  YouTubeVideo,
  attachListeners,
  authorization,
  decipher_info,
  deezer,
  dz_advanced_track_search,
  dz_validate,
  extractID,
  getFreeClientID,
  is_expired,
  playlist_info,
  refreshToken,
  search,
  setToken,
  so_validate,
  soundcloud,
  sp_validate,
  spotify,
  stream,
  stream_from_info,
  validate,
  video_basic_info,
  video_info,
  yt_validate
});
