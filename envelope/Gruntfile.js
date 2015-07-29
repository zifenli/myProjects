module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
        development: {
            options: {
                paths: ["./less"],
                strictMath:true,
                compress:true
            },
            files: {
                "./css/index.css": "./less/main.less"
            }
        }
    },
    watch: {
        script: {
            files: ["./less/*,.less/common/*.less"],
            tasks:['less'],
            options: {
                spawn: false
            }
        }
    }

  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 默认被执行的任务列表。
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('cl', ['less']);

};