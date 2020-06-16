
import BluebirdOrigin from 'bluebird'

export { BluebirdOrigin }

export const BluebirdCancellation: typeof import('bluebird') = BluebirdOrigin.getNewLibraryCopy() as typeof import('bluebird');

BluebirdCancellation.config({
	cancellation: true
});

export default BluebirdCancellation
