import React from "react";
import isEqual from 'lodash.isequal';

export const MemoDecorator = (component, comparator = isEqual) => React.memo(component, comparator);
