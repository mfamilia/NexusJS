class SiteController < ApplicationController
  def show
    respond_to do |format|
      format.html { render layout: "application"}
    end
  end
end