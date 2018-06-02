using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ateliware.Core
{

	public class Response<responseObject> {

		public responseObject Obj { get; private set; }
		public bool Status { get; private set; }
        public string[] Error { get; private set; }
        public string[] Exception { get; private set; }

        public Response(responseObject obj, bool status, string[] error, string[] exception)
		{
			this.Obj = obj;
			this.Status = status;
			this.Error = error;
            this.Exception = exception;
        }
	}

	public static class SystemResponse<responseObject>
	{
        public static Response<responseObject> Return(responseObject obj, bool status = true, string[] error = null, string[] exception = null)
        {            
            return new Response<responseObject>(obj, status, error!=null ? error : new string[] { } , exception != null ? exception : new string[] { });
        }
    }
}
