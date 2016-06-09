FROM tomcat:8.0.20-jre7
MAINTAINER Olivier Berthonneau <berthonneau.olivier@gmail.com>

ENV GUAC_VERSION=0.9.9
ENV GUACAMOLE_HOME="/etc/guacamole"

RUN wget http://sourceforge.net/projects/guacamole/files/current/binary/guacamole-${GUAC_VERSION}.war/download -O /usr/local/tomcat/webapps/guacamole.war
RUN mkdir -p $GUACAMOLE_HOME/extensions/ && \
    wget https://sourceforge.net/projects/guacamole/files/current/extensions/guacamole-auth-noauth-${GUAC_VERSION}.tar.gz && \
    tar xvf guacamole-auth-noauth-${GUAC_VERSION}.tar.gz && \
    cp guacamole-auth-noauth-${GUAC_VERSION}/guacamole-auth-noauth-${GUAC_VERSION}.jar $GUACAMOLE_HOME/extensions/guacamole-auth-noauth-${GUAC_VERSION}.jar && \
    rm -rf guacamole-auth-noauth-${GUAC_VERSION}/

ENV JAVA_OPTS="-Djava.library.path=/usr/local/apr/lib -Djava.security.egd=file:/dev/./urandom -Djava.awt.headless=true -Xmx1024m -XX:MaxPermSize=512m -XX:+UseConcMarkSweepGC"

COPY ./noauth-config.xml /etc/guacamole/noauth-config.xml
COPY ./guacamole.properties /etc/guacamole/guacamole.properties

EXPOSE 8080

CMD ["catalina.sh", "run"]