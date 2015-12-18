/**
 * OneAPM agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name : ['shiyi-server'],
  /**
   * Your OneAPM license key.
   */
  license_key : 'UwoDAQ0HVldb814VFVdHXgoeWh93cddUXRgLA1JRTc992ggLHwNeHgZT2f24CQQZCAJOVlc=',
  logging : {
    /**
     * Level at which to log. 'trace' is most useful to OneAPM when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level : 'info'
  },
  transaction_events: {
        enabled: true
  }
};
