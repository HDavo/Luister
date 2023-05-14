export interface LastFm {
  artist: LastFmArtist;
}

export interface LastFmArtist {
  name:       string;
  mbid:       string;
  url:        string;
  image:      Image[];
  streamable: string;
  ontour:     string;
  stats:      Stats;
  similar:    Similar;
  tags:       Tags;
  bio:        Bio;
}

export interface Bio {
  links:     Links;
  published: string;
  summary:   string;
  content:   string;
}

export interface Links {
  link: Link;
}

export interface Link {
  "#text": string;
  rel:     string;
  href:    string;
}

export interface Image {
  "#text": string;
  size:    string;
}

export interface Similar {
  artist: ArtistElement[];
}

export interface ArtistElement {
  name:  string;
  url:   string;
  image: Image[];
}

export interface Stats {
  listeners: string;
  playcount: string;
}

export interface Tags {
  tag: Tag[];
}

export interface Tag {
  name: string;
  url:  string;
}
