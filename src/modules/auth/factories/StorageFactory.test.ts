import type { StorageRepository } from "../domain/repositories/StorageRepository";
import { SessionStorageRepository } from "../infrastructure/repositories/SessionStorageRepository";
import { StorageFactory } from "./StorageFactory";

describe('StorageFactory - Valid Cases', () => {

    // list of arguments
    const successCases = [
        { type: "session", factory: () => new SessionStorageRepository(), expectedClass: SessionStorageRepository },
        //{ type: "local",   factory: () => null,   expectedClass: Error }
    ];

    // using it.each
    it.each(successCases)(
        "should create an instance of $expectedClass.name when type '$type' is registered",
        ({ type, factory, expectedClass }) => {
            // 1. Arrange: dynamically register the factory
            StorageFactory.register(type, factory);

            // 2. Act: request creation from the component
            const repository = StorageFactory.create(type);

            // 3. Assert: verify it is the correct class
            expect(repository).toBeInstanceOf(expectedClass);
        }
    );

    const failCases = [
        { type: "unknown" },
        { type: "local" },
    ];

    it.each(failCases)(
        "should throw an error when type '$type' is not registered",
        ({ type }) => {
            expect(() => StorageFactory.create(type)).toThrow(Error);
        }
    );

});
