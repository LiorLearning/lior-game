import React, { SVGProps } from 'react';
import withEventLogging from '../EventLogger';

interface MyPathProps extends SVGProps<SVGPathElement> {}

const Path = withEventLogging((props: MyPathProps) => <path {...props} />);

export { Path };
