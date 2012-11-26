/*
 *	FormStyles
 */
 /*jshint jquery:true browser:true expr:true*/
(function($){
	"use strict"; // jshint
	var FormStyles = function(element) {
		this.$element = element;
		this.$type = this.$element.attr("type");
		this.$family = this.$element.parents("fieldset").find("input[type="+this.$type+"]");
		var checked = this.$element.attr("checked"),
			replacement = $('<div class="formstyle-replacement formstyle-' + this.$type + '">'),
			replacement_classes = ["formstyle-replacement", "formstyle-" + this.$type];
		checked && replacement_classes.push("checked");
		replacement_classes = replacement_classes.join(" ");
		replacement.addClass(replacement_classes);
		this.$element.addClass("formstyle-element").wrap(replacement);
		this.$replacement = this.$element.parent(".formstyle-replacement");
		this.$replacement.on("click", $.proxy(this.doClick, this));
	};
	FormStyles.prototype = {
		doClick: function(e) {
			var target = $(e.currentTarget);
			if (target.hasClass("checked") && this.$type == "checkbox") {
				target.removeClass("checked");
				this.$element.attr("checked", null);
			} else if (!target.hasClass("checked") && this.$type == "radio") {
				this.$family.attr("checked", null).parents(".formstyle-replacement").removeClass("checked");
				target.addClass("checked");
				this.$element.attr("checked", "checked");
			} else if (!target.hasClass("checked")) {
				target.addClass("checked");
				this.$element.attr("checked", "checked");
			}
		}
	};
	$.fn.formstyles = function() {
		return this.each(function() {
			var element = $(this),
				data = element.data("form-style");
			if (!data) {
				element.data("form-style", new FormStyles(element));
			}
		});
	};
})(jQuery);