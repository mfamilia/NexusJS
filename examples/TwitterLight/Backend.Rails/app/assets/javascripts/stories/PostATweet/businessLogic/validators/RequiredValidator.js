TwitterLight.Validators.LengthValidator = function (obj) {
  this.obj = obj;
  this.isValid = function () {
    if (typeof this.obj === 'undefined')
      return false;
    if (this.obj.length === 0)
      return false;
    return true;
  };
};