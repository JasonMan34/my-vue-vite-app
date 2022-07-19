/* tslint:disable */
/* eslint-disable */
/**
* Decodes a hamming-encoded file
*
* /// # Arguments
* `file` - A u8 vector slice representing a hamming encoded file in bytes\
* `should_fix` - Should corrupted data be fixed
* @param {Uint8Array} file
* @param {boolean} should_fix
* @returns {Uint8Array}
*/
export function decode(file: Uint8Array, should_fix: boolean): Uint8Array;
