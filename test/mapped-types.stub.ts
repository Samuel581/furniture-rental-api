// Jest runtime stub for @nestjs/mapped-types.
//
// The installed copy is v12, which is ESM-only (`"type": "module"`) and cannot
// be `require`d by ts-jest, so booting AppModule crashes. The update DTOs use
// these helpers only to inherit validation metadata at module-load time, which
// the integration tests never exercise — identity passthroughs are enough to
// load the module.
//
// @nestjs/swagger's own PartialType/OmitType reach into mapped-types' internal
// helpers, so those are stubbed as no-ops too.
//
// This whole file disappears when #28 removes the @nestjs/mapped-types
// dependency.
type MappedType = (base: any) => any;

export const PartialType: MappedType = (base) => base;
export const PickType: MappedType = (base) => base;
export const OmitType: MappedType = (base) => base;
export const IntersectionType: MappedType = (base) => base;

// Internal helpers consumed by @nestjs/swagger's type helpers.
export const inheritValidationMetadata = () => undefined;
export const inheritTransformationMetadata = () => undefined;
export const inheritPropertyInitializers = () => undefined;
export const applyIsOptionalDecorator = () => undefined;
export const applyValidateIfDefinedDecorator = () => undefined;
