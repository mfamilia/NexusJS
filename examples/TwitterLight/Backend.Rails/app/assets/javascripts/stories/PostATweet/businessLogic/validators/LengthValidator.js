TwitterLight.Validators.LengthValidator = function (str, min, max) {
  this.str = str;
  this.min = min;
  this.max = max;
  this.isValid = function () {
    if (this.str) {
      if (this.min) {
        if (this.str.length < this.min) {
          return false;
        }
      }
      if (this.max) {
        if (this.str.length > this.max) {
          return false;
        }
      }
    }
    return true;
  };
};