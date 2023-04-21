import SessionDb from '@ulixee/hero-core/dbs/SessionDb';

export default interface ISessionDb {
    readSessionDb(): Promise<SessionDb>;
}
