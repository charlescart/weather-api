import { Lookup } from 'geoip-lite';

export type ClientIp = string | undefined;

export type GetGeoForIp = Lookup | null;
