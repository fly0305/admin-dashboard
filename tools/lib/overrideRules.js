/**
 * Flatlogic Dashboards (https://flatlogic.com/admin-dashboards)
 *
 * Copyright © 2015-present Flatlogic, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

function overrideRules(rules, patch) {
  return rules.map(ruleToPatch => {
    let rule = patch(ruleToPatch);
    if (rule.rules) {
      rule = { ...rule, rules: overrideRules(rule.rules, patch) };
    }
    if (rule.oneOf) {
      rule = { ...rule, oneOf: overrideRules(rule.oneOf, patch) };
    }
    return rule;
  });
}

export default overrideRules;
